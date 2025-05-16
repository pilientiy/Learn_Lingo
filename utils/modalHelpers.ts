export const toggleModal = (
  setter: (isOpen: boolean) => void,
  value: boolean
) => {
  setter(value);
};

export const handleOpenModal =
  (setter: (isOpen: boolean) => void) => (): void => {
    toggleModal(setter, true);
  };

export const handleCloseModal =
  (setter: (isOpen: boolean) => void) => (): void => {
    toggleModal(setter, false);
  };
