import { useState } from 'react';
import styles from './AddModal.module.css'; 

function AddModal({ isOpen, onClose, genres, handleSubmit,errors}) {


  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit} id="modalEditForm" className={styles.formContainer}>
                <div className={styles.formGroup}>
                  <div className={styles.error}>
                    <p>{errors?.title}</p>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className={styles.formControl}
                    placeholder="Title"
                  />
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/jpeg, image/png, image/jpg"
                    className={styles.formControl}
                  />
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.error}>
                    <p>{errors?.author}</p>
                  </div>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    className={styles.formControl}
                    placeholder="Author"
                  />
                </div>
                <div className={styles.categorySelect}>
                  <p>Choose a category</p>
                  <select name="genre" className={styles.selectField}>
                    { 
                      genres.map((gen,i)=>
                      <option key={i}>{gen.name}</option>
                    )}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.error}>
                    <p>{errors?.published}</p>
                  </div>
                  <input
                    type="text"
                    id="year"
                    name="published"
                    className={styles.formControl}
                    placeholder="Year"
                  />
                </div>
                <div className={styles.formGroup}>
                  <div className={styles.error}>
                    <p>{errors?.rating}</p>
                  </div>
                  <input
                    type="text"
                    id="rating"
                    name="rating"
                    className={styles.formControl}
                    placeholder="Rating"
                  />
                </div>
                {/* Other form fields... */}
                <div className={styles.buttonContainer}>
                  <button type="submit" className={styles.updateButton}>Add</button>
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

export default AddModal;