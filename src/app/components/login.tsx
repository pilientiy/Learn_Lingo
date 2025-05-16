import React from 'react';
import Button from './button';
import LoginForm from './login-form';
import ModalWindow from './modal-window';
import Registration from './registration';
import { useStateContext } from './state-provider';
import { handleCloseModal, handleOpenModal } from '../../../utils/modalHelpers';

export default function Login() {
  const { isOpenReg, setIsOpenLog, setIsOpenReg } = useStateContext();

  return (
    <div className="flex flex-col relative sm:p-7 p-16">
      <Button
        type={'button'}
        onClick={handleCloseModal(setIsOpenLog)}
        className="absolute top-5 right-5 stroke-black"
      >
        <svg width={32} height={32}>
          <use href="/icons/icons.svg#icon-close"></use>
        </svg>
      </Button>
      <div className="mb-10">
        <h3 className="font-medium text-[40px] leading-tight tracking-tight mb-5">
          Log In
        </h3>
        <p className="max-w-[438px] leading-snug text-text-color-muted">
          Welcome back! Please enter your credentials to access your account and
          continue your search for an teacher.
        </p>
      </div>

      <LoginForm />

      <div className="flex gap-6 text-sm">
        <p className="text-text-color-muted">{"Don't have an account?"}</p>
        <Button
          type={'button'}
          className={'underline decoration-solid decoration-black'}
          onClick={() => {
            handleCloseModal(setIsOpenLog)();
            setTimeout(() => {
              handleOpenModal(setIsOpenReg)();
            }, 200);
          }}
        >
          Registration
        </Button>
      </div>

      <ModalWindow
        isOpenModal={isOpenReg}
        onCloseModal={handleCloseModal(setIsOpenReg)}
      >
        <Registration />
      </ModalWindow>
    </div>
  );
}
