import { useState } from 'react';
import { CiLogin } from 'react-icons/ci';
import Link from 'next/link';
import Modal from '@/components/modal/modal';
import LoginForm from '@/layout/login/login-form';
import Portal from '@/utils/portal';

export default function Login() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button
        aria-label="login"
        onClick={handleOpenModal}
        className="bg-gray-2 dark:bg-dark-bg flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-black md:h-12 md:w-12 dark:text-white"
      >
        <CiLogin size={24} />
      </button>

      {showModal && (
        <Portal>
          <Modal
            title="Sign in to your account"
            description="Login to your account for a faster checkout."
            onClose={handleCloseModal}
          >
            <LoginForm />

            <p className="text-body-color text-center text-base font-medium">
              Don’t you have an account?{' '}
              <Link href="/" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </Modal>
        </Portal>
      )}
    </div>
  );
}
