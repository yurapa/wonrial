import { ReactNode } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import styles from './modal.module.scss';

export default function Modal({
  title,
  description,
  children,
  onClose,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900/70 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="dark:bg-dark relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="dark:bg-dark bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className={styles.modal__header}>
                  <AiOutlineCloseCircle color="black" onClick={onClose} />
                </div>

                {title && (
                  <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                    {title}
                  </h3>
                )}

                {description && (
                  <p className="text-body-color mb-11 text-center text-base font-medium">{description}</p>
                )}

                <div className="mt-2">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
