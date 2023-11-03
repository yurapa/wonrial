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
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white dark:bg-dark px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <div className={styles.modal__header}>
                  <AiOutlineCloseCircle color="black" onClick={onClose} />
                </div>

                {title && (
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    {title}
                  </h3>
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
