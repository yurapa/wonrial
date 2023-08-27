import cx from 'classnames';

import utilStyles from '../../styles/utils.module.css';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={cx(utilStyles.container, utilStyles.container_col)}>
        <div className={cx(utilStyles.col6, styles.footer__contact)}>
          <p>
            <strong>WONRIAL ENTERPRISES LTD</strong>
          </p>
          <p>Legal entity registered under the law of Cyprus</p>
          <p>
            <strong>Registration number:</strong> HE 445780
          </p>
          <p>
            <strong>Address:</strong> Vasili Michailidi, 9, 3026, Limassol, Cyprus
          </p>
        </div>

        <div className={cx(styles.footer__copyright, utilStyles.col6)}>&copy; WONRIAL ENTERPRISES LTD 2023</div>
      </div>
    </div>
  );
}
