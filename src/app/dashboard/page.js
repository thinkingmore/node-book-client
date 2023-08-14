"use client"
import React from 'react';
import styles from './page.module.css'
import useSWR,{ useSWRConfig } from 'swr'
import Pagination from '@/components/Pagination/Pagination';
import EditModal from '@/components/Modals/EditModal/EditModal';
import AddModal from '@/components/Modals/AddModal/AddModal';
import { useState } from 'react';
import { useSearch } from '@/context/search/SearchContext';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import validateForm from '@/utils/formValidator';

const Dashboard = () => {
    const [ currentPage, setCurrentPage ] = useState("")
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const [errors, setErrors] = useState({});
    const { searchText } = useSearch();
    const router = useRouter()

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`
    const booksUrl = `${baseUrl}?page=${currentPage}&search=${searchText}`;
    const imgBBKey= process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const { data, error } = useSWR(booksUrl, fetcher)
 
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    // Add modal function
    const openAddModal = (book) => {
        setAddModal(true);
    };

    const closeAddModal = () => {
      setAddModal(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();   
      const imageData = new FormData();
      imageData.append('image', e.target[1].files[0]);
    
      try {
        const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
          method: 'POST',
          body: imageData,
        });  
    
        if (imgbbResponse.ok) {
          const imgbbData = await imgbbResponse.json();
          const imageUrl = imgbbData.data.url;
    
          const bookData = {
            title: e.target[0].value,
            image: imageUrl,  
            author: e.target[2].value,
            genre: e.target[3].value,
            publicationYear: e.target[4].value,
            rating: e.target[5].value,
          };
    
          const createBookResponse = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
          });
    
          if (createBookResponse.ok) {
            router.refresh()
            closeAddModal()
            console.log('Book created successfully');
          } else {
            console.error('Failed to create book');
          }
        } else {
          console.error('Image upload failed');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
      
  };

    // Edit modal function
    const openEditModal = (book) => {
        setSelectedBook(book)
        setEditModal(true);
    };
    
    const closeEditModal = () => {
        setEditModal(false);
    };

    // Handle delete 
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            router.refresh()
            console.log('Book deleted successfully');    
          } else {
            console.error('Failed to delete book');
          }
        } catch (error) {
          console.error('Error occurred during delete request:', error);
        }
      };

    // handle pagination,sort and filter
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={styles.container}>
            <div className={styles.addBook}>
              <button onClick={openAddModal} className={styles.addButton}>
                  Add a book
              </button>
            </div>
            <div className={styles.bookItems}>
            { data && data.data?.books.map(book=>(
                <div key={book._id}  className={styles.bookCard}>
                    <div className={styles.bookCard__image}>
                    <Image width={200} height={313} className={styles.img} src={book.image}  alt="book" />
                    </div>
                    <div className={styles.bookCard__content}>
                        <h3>{book.title}</h3>
                        <p>By {book.author}</p>
                        <p><b>Category: </b>{book.genre}</p>
                        <p><b>Published in: </b>{book.published}</p>
                        <p><b>Rating</b> {book.rating}</p>
                    </div>
                    <div className={styles.bookCard__button}>
                        <button onClick={()=>openEditModal(book)} className={styles.editButton}>
                          Edit
                        </button>
                        <button onClick={()=>handleDelete(book._id)} className={styles.deleteButton}>
                          Delete
                        </button>
                    </div>
                </div>
            ))}
                <div className={styles.pageItems}>
                    <Pagination 
                        page={data?.data?.page}
                        total={data?.data?.total}
                        limit={data?.data?.limit}
                        handlePagination={handlePagination}
                    />
                </div>
                <EditModal 
                    genres={data?.data?.genres} 
                    book={selectedBook} 
                    isOpen={editModal} 
                    onClose={closeEditModal} 
                />
                <AddModal 
                    genres={data?.data?.genres} 
                    isOpen={addModal} 
                    onClose={closeAddModal}
                    handleSubmit={handleSubmit} 
                />
            </div>
        </div>
    );
};

export default Dashboard;