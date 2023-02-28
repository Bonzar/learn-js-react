import React from 'react';
import styles from './cardpreview.css';

export function CardPreview() {
  return (
    <div className={styles.cardPreview}>
      <div className={styles.textContent}>
        <div className={styles.metaData}>
          <div className={styles.userLink}>
            <img
              className={styles.avatar}
              src="https://secure.gravatar.com/avatar/1d0f47d0fa903825e7c0e5d7f83d9b66?s=46&d=identicon"
              alt="avatar"
            />
            <a href="#user-url" className={styles.username}>Дмитрий Гришин</a>
          </div>
          <span className={styles.createdAt}>
            <span className={styles.publishedLabel}>опубликовано </span>
            4 часа назад
          </span>
        </div>
        <h2 className={styles.title}>
          <a href="#post-url" className={styles.postLink}>
            Следует отметить, что новая модель организационной деятельности, Следует отметить, что новая
          </a>
        </h2>
      </div>
      <div className={styles.preview}>
        <img className={styles.previewImg} src="https://cdn.dribbble.com/userupload/4913742/file/original-db72d36e7ee983b3e3a5a606d5a11f4a.jpg?compress=1&resize=1504x1128" alt="post preview cover"/>
      </div>
    </div>
  );
}
