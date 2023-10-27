import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CiLogin } from 'react-icons/ci';
import Modal from '@/components/modal/modal';

export default function Login() {
  const [showModal, setShowModal] = useState(false);
  const modalRoot = document.getElementById('modal-root') || document.body;

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <CiLogin size={24} color="white" onClick={handleOpenModal} />

      {showModal &&
        createPortal(
          <Modal title="Login Form" onClose={handleCloseModal}>
            <div>Enter your username and password.</div>
          </Modal>,
          modalRoot,
        )}
    </div>
  );
}
