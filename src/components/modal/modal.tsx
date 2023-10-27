import { ReactNode } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import styles from './modal.module.scss';

export default function Modal({
  title,
  children,
  onClose,
}: {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWrapper}>
        <div className={styles.modal}>
          <div className={styles.modal__header}>
            <AiOutlineCloseCircle color="black" onClick={onClose} />
          </div>
          {title && <div className={styles.modal__title}>{title}</div>}
          <div className={styles.modal__body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
