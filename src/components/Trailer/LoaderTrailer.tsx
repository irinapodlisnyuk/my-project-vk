
import styles from './loaderTrailer.module.scss'

export default function LoaderTrailer() {
  return (
    <div className={styles['loader-trailer']}>
      {[...Array(12)].map((_, i) => (
        <div key={i} className={styles["loader-trailer__item"]}></div>
      ))}
    </div>
  );
}