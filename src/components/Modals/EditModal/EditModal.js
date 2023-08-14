import { useState } from 'react';
import styles from './EditModal.module.css'; 
import validateForm from '@/utils/formValidator';

function EditModal({ isOpen, onClose, genres, book }) {
  const [errors, setErrors] = useState({});
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/books`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: e.target[0].value,
      author: e.target[1].value,
      genre: e.target[2].value,
      published: e.target[3].value,
      rating: e.target[4].value
    }

    // pass the updated data to form validator and send update request 
    const validationErrors = validateForm(body);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${baseUrl}/${book._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          console.log('Book data updated successfully');
          onClose(); 
        } else {
          console.error('Failed to update book data');
        }
      } catch (error) {
        console.error('Error occurred during API request:', error);
      }
    } else {
      setErrors(validationErrors);
      console.log('Form validation errors:', validationErrors);
    }
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} id="modalEditForm" className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={styles.formControl}
                    placeholder="Title"
                    defaultValue={book.title}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className={styles.formControl}
                    placeholder="Author"
                    defaultValue={book.author}
                  />
                </div>
                <div className={styles.categorySelect}>
                  <p>Choose a category</p>
                  <select defaultValue={book.genre} name="genre" className={styles.selectField}>
                    { 
                      genres.map((gen,i)=>
                      <option key={i}>{gen}</option>
                    )}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="year"
                    name="published"
                    className={styles.formControl}
                    placeholder="Year"
                    defaultValue={book.published}
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="rating"
                    name="rating"
                    className={styles.formControl}
                    placeholder="Rating"
                    defaultValue={book.rating}
                  />
                </div>
                {/* Other form fields... */}
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.updateButton}>Update</button>
                  <button className={styles.closeButton} onClick={onClose}>
                    Close
                  </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditModal;
