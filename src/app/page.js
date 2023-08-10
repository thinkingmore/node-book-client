"use client"
import Image from 'next/image'
import styles from './page.module.css'
import useSWR from 'swr'
import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';

export default function Home() {
  const [ currentPage, setCurrentPage ] = useState("")
  const [ sortOrder, setSortOrder ] = useState(
    {
      sortBy:"rating",
      sortValue:"desc",
    }
  )

  const fetcher = (...args) => 
    fetch(...args)
    .then(res => res.json());

  const { data, error, isLoading } = useSWR(`http://localhost:5000/api/v1/books?page=${currentPage}&sort=${sortOrder.sortBy},${sortOrder.sortValue}`, fetcher)

  console.log(data?.data)

  const handlePagination = (page) => {
    setCurrentPage(page);
  }

  const handleSortBy = (event) => {
    setSortOrder({
      ...sortOrder,sortBy:event.target.value
    });
  };

  const handleSortOrder = (event) => {
    setSortOrder({
      ...sortOrder,sortValue:event.target.value
    });
  };
  console.log(sortOrder)
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.bookItems}>
          {data?.data?.books.map(book=>(
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
        </div>
        <div className={styles.sidebar}>
          <div className={styles.sidebarItems}>
            <form onChange={handleSortBy} className={styles.sortForm}>
              <label htmlFor="books">Sort by:</label>
                <select id="books">
                  <option value="rating">Rating</option>
                  <option value="year">Year</option>
                </select>
            </form>
            <form  name="order" onChange={handleSortOrder} className={styles.sortForm}>
              <label htmlFor="books">Order by:</label>
                <select id="books">
                  <option value="desc">High</option>
                  <option value="asc">Low</option>
                </select>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}