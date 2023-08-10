"use client"
import Image from 'next/image'
import styles from './page.module.css'
import useSWR from 'swr'

export default function Home() {
  const fetcher = (...args) => 
    fetch(...args)
    .then(res => res.json());

  const { data, error, isLoading } = useSWR('http://localhost:5000/api/v1/books', fetcher)

  console.log(data?.data?.books)
  const handleSort = (e) => {
    const sortOrder = e.target.value;
    console.log(sortOrder);
  }
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.bookItems}>
          {data?.data?.books.map(book=>(
              <div key={book._ids}  className={styles.bookCard}>
                <div className={styles.bookCard__image}>
                  <img className={styles.img} src={book.image}  alt="book" />
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
        </div>
        <div className={styles.sidebar}>
          <div className={styles.sidebarItems}>
            <form onChange={handleSort} className={styles.sortForm}>
              <label htmlFor="books">Sort by:</label>
                <select id="books" name="cars">
                  <option value="Old">Old</option>
                  <option value="New">New</option>
                </select>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}