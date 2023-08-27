import styles from './banner.module.scss';

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__text}>
        <h1>Professional Technology Assistance</h1>
        <p>We make technology accessible!</p>
      </div>
    </div>
  );
}
