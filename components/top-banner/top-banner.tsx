import styles from './top-banner.module.scss';

export default function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <div>Support Ukraine 🇺🇦</div>
      <a
        href="https://opensource.fb.com/support-ukraine"
        target="_blank"
        rel="noopener"
      >
        Help Provide Humanitarian Aid to Ukraine
      </a>
    </div>
  );
}
