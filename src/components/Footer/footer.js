import React from 'react';
import styles from './footer.module.css';

const footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footerItems}>
                <p>All right reserved.Book Review &copy; 2023</p>
            </div>
        </div>
    );
};

export default footer;