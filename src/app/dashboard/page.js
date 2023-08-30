"use client"
import React, { Children } from 'react';
import styles from './page.module.css'
import useSWR from 'swr'
import Pagination from '@/components/Pagination/Pagination';
import EditModal from '@/components/Modals/EditModal/EditModal';
import AddModal from '@/components/Modals/AddModal/AddModal';
import { useState } from 'react';
import { useSearch } from '@/app/contexts/SearchContext';
import Image from 'next/image'
import toast, { Toaster } from 'react-hot-toast';
import validateForm from '@/utils/formValidator';
import PrivateRoute from '../routes/PrivateRoute/PrivateRoute';
import { useAuth } from '../contexts/authContext';


const Dashboard = () => {
    const [ currentPage, setCurrentPage ] = useState("")
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState({});
    const [errors, setErrors] = useState({});
    const { searchText } = useSearch();
    const { user } = useAuth(); 
    
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`
    const booksUrl = `${baseUrl}?page=${currentPage}&search=${searchText}`;
    const imgBBKey= process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    // fetch books
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error, mutate } = useSWR(booksUrl, fetcher)
 
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>


    // Add modal function
    const openAddModal = (book) => {
        setAddModal(true);
    };

    const closeAddModal = () => {
      setAddModal(false);
      setErrors("")
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const title = e.target[0].value;
      const imageFile = e.target[1].files[0];
      const author = e.target[2].value;
      const genre = e.target[3].value;
      const year = e.target[4].value;
      const rating = e.target[5].value;

      const validationErrors = validateForm({
        title,
        author,
        genre,
        year,
        rating,
      });
    
      if (Object.keys(validationErrors).length === 0) {
        const imageData = new FormData();
        imageData.append('image', imageFile);
    
        try {
          const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, {
            method: 'POST',
            body: imageData,
          });
    
          if (imgbbResponse.ok) {
            const imgbbData = await imgbbResponse.json();
            const imageUrl = imgbbData.data.url;
    
            const bookData = {
              title,
              image: imageUrl,
              author,
              genre,
              year,
              rating,
            };
    
            try {
              const createBookResponse = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
              });
    
              if (createBookResponse.ok) {
                closeAddModal();
                mutate();
                toast.success('Book created successfully');
              } else {
                setErrors('Failed to create book');
              }
            } catch (error) {
              setErrors('An error occurred while creating the book');
            }
          } else {
            setErrors('Image upload failed');
          }
        } catch (error) {
          setErrors('An error occurred during image upload');
        }
      } else {
        // Handle validation errors
        setErrors(validationErrors);
      }
    };
    

    // Edit modal function
    const openEditModal = (book) => {
        setSelectedBook(book)
        setEditModal(true);
    };
    
    const closeEditModal = () => {
        setEditModal(false);
        setErrors("")
    };

    // Handle delete 
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            mutate()
            toast.success('Book deleted successfully');    
          } else {
            setErrors('Failed to delete book');
          }
        } catch (error) {
          setErrors('Error occurred during delete request:', error);
        }
      };

    // handle pagination,sort and filter
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    return (
          <PrivateRoute>
            <div className={styles.container}>
              <h3>Hello, {user?.username}</h3>
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
                          <p><b>Published in: </b>{book.year}</p>
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
                      errors={errors}
                      setErrors={setErrors}
                      mutate={mutate} 
                  />
                  <AddModal 
                      genres={data?.data?.genres} 
                      isOpen={addModal} 
                      onClose={closeAddModal}
                      handleSubmit={handleSubmit}
                      errors={errors} 
                  />
              </div>
              <Toaster />
            </div>
          </PrivateRoute>
    );
};

export default Dashboard;