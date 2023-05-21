import React from 'react';

const useModal = () => {
  const [modalOn, setModalOn] = React.useState(false);

  const openModal = () => {
    setModalOn(true);
  };

  const closeModal = () => {
    setModalOn(false);
  };
  return { modalOn, openModal, closeModal };
};

export default useModal;
