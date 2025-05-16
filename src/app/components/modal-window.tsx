import React from 'react';
import Modal from 'react-modal';

interface ModalWindowProps {
  children: React.ReactNode;
  isOpenModal: boolean;
  onCloseModal: () => void;
}

export default function ModalWindow({
  children,
  isOpenModal,
  onCloseModal,
}: ModalWindowProps) {
  const customStyles = {
    content: {
      maxWidth: '567px',
      width: '100%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius: '30px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
    },
    overlay: {
      backgroundColor: 'rgba(18, 20, 23, 0.7)',
    },
  };

  Modal.setAppElement('#modal');

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      style={customStyles}
      closeTimeoutMS={250}
    >
      {children}
    </Modal>
  );
}
