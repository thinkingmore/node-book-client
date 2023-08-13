"use client"
import React from 'react';
import styles from './page.module.css'
import useSWR from 'swr'
import Pagination from '@/components/Pagination/Pagination';
import EditModal from '@/components/Modals/EditModal/EditModal';
import { useState } from 'react';
import { useSearch } from '@/context/search/SearchContext';
import Image from 'next/image'

const Dashboard = () => {
    const [ currentPage, setCurrentPage ] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { searchText } = useSearch();

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const booksUrl = `${process.env.NEXT_PUBLIC_API_URL}/books?page=${currentPage}&search=${searchText}`;

    const { data, error } = useSWR(booksUrl, fetcher)
 
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    // Edit modal function
    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // handle pagination,sort and filter
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className={styles.container}>
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
                        <button onClick={openModal} className={styles.editButton}>
                          Edit
                        </button>
                        <button className={styles.deleteButton}>
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
                <EditModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </div>
    );
};

export default Dashboard;