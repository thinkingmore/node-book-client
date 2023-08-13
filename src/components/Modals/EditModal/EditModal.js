import { useState } from 'react';
import styles from './EditModal.module.css'; 

function EditModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    published: '',
    rating: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform update logic with formData (e.g., update database or UI)

    // Clear form fields
    setFormData({
      title: '',
      author: '',
      category: '',
      published: '',
      rating: 1,
    });

    // Close the modal
    onClose();
  };

  return (
    <div className={styles.container}>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {/* <form id="modalEditForm" className={styles.formContainer}>
                <div className={styles.formGroup}>
                    <input type="text" id="title" name="title" className={styles.formControl} placeholder="Title" required/>
                </div>
                <div className={styles.formGroup}>
                    <input type="text" id="category" name="category" className={styles.formControl} placeholder="Category" required/>
                </div>
                <div className={styles.formGroup}>
                    <input type="text" id="author" name="author" className={styles.formControl} placeholder="Author" required/>
                </div>
                <div className={styles.formGroup}>
                    <input type="date" id="published" name="published" className={styles.formControl} required/>
                </div>
                <div className={styles.formGroup}>
                    <input type="number" id="rating" name="rating" className={styles.formControl} min="1" max="5" placeholder="Rating" required/>
                </div>
                <div className={styles.buttonContainer}>             
                        <button className={styles.updateButton}>Update</button>
                        <button className={styles.closeButton} onClick={onClose}>Close</button>
                </div>
            </form> */}
            <form id="modalEditForm" className={styles.formContainer}>
            <div className={styles.formGroup}>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={styles.formControl}
                  placeholder="Title"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className={styles.formControl}
                  placeholder="Author"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="category"
                  name="category"
                  className={styles.formControl}
                  placeholder="Category"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="yearofPub"
                  name="yearofPub"
                  className={styles.formControl}
                  placeholder="Year"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  id="rating"
                  name="rating"
                  className={styles.formControl}
                  placeholder="Rating"
                  required
                />
              </div>
              {/* Other form fields... */}
              <div className={styles.buttonContainer}>
                <button className={styles.updateButton}>Update</button>
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
