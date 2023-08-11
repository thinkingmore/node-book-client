import React, { useEffect } from 'react';
import styles from './genre.module.css'

const Genre = ({ genres, filterGenres, setFilterGenres}) => {

    // take checkbox value 
    const handleFilter = () => {   
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedGenres = Array.from(checkboxes).map(checkbox => checkbox.value);
        setFilterGenres(selectedGenres);
    };

    // get selected checkbox 
    const getSelectedId = (genre) => {
        var checkbox = document.getElementById(genre);
        checkbox.checked = true;
    }

    // show currenly selectd checkbox 
    useEffect(() => {
        filterGenres.map(genre=> getSelectedId(genre))
      }, [filterGenres]);

    return (
        <div>
          {   
            genres.map(gen=>
            <li key={gen._id} className={styles.categoryList}>
                <label>
                <input type="checkbox"  name={gen.name} value={gen.name} id={gen.name} />
                    <span>{gen.name}</span>
                </label>
            </li>
            )
          }
          <button className={styles.submitButton} onClick={handleFilter}>Submit</button>  
        </div>
    );
};

export default Genre;