"use client"
import Image from 'next/image'
import styles from './page.module.css'
import useSWR from 'swr'
import Pagination from '@/components/Pagination/Pagination';
import { useState } from 'react';
import Genre from '@/components/Genre/Genre';
import { useSearch } from '@/app/contexts/SearchContext';

const fetcher = async (urls) => {
  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(response => response.json()));
  return data;
};

export default function Home () {
  const [ currentPage, setCurrentPage ] = useState("")
  const [ sortOrder, setSortOrder ] = useState({sortBy:"rating",sortValue:"desc",})
  const [ filterGenres, setFilterGenres] = useState([])
  const { searchText } = useSearch();

  const genresUrl = `${process.env.NEXT_PUBLIC_API_URL}/genres`;
  const booksUrl = `${process.env.NEXT_PUBLIC_API_URL}/books?page=${currentPage}&
  sort=${sortOrder.sortBy},${sortOrder.sortValue}&genre=${filterGenres}&search=${searchText}`;

  // Fetch data from multiple endpoints using fetcher with Promise.all and SWR
  const { data, error } = useSWR([genresUrl, booksUrl], fetcher);


  // handle pagination,sort and filter
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

 
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.bookItems}>
          { data && data[1].data?.books.map(book=>(
              <div key={book._id}  className={styles.bookCard}>
                <div className={styles.bookCard__image}>
                  <Image width={200} height={313} className={styles.img} src={book.image}  alt="book" />
                </div>
                <div className={styles.bookCard__content}>
                  <h3>{book.title}</h3>
                  <p>By {book.author}</p>
                  <p><b>Category: </b>{book.genre}</p>
                  <p><b>Published in: </b>{book?.year}</p>
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
            <div className={styles.sortItems}>
              <form onChange={handleSortBy} name="sort" className={styles.sortForm}>
                <label htmlFor="books">Sort by:</label>
                  <select id="books">
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                  </select>
              </form>
              <form onChange={handleSortOrder} name="order" className={styles.sortForm}>
                <label htmlFor="books">Order by:</label>
                  <select id="books">
                    <option value="desc">High</option>
                    <option value="asc">Low</option>
                  </select>
              </form>
            </div>
          </div>
          <div className={styles.sidebarItems}>
            <div className={styles.categoryItems}>
              <p>Filter by category</p>
                <ul className={styles.categoryListItems}>
                  {data &&
                  <Genre
                    filterGenres={filterGenres} 
                    genres={data[0]?.data}
                    setFilterGenres={(genre) => setFilterGenres(genre)}
                    />
                  }  
                </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}