'use client';

import React, { useMemo } from 'react';
import Navigation from './navigation';
import Logo from './logo';
import AuthMenu from './auth-menu';
import { useAuthContext } from './auth-provider';
import UserMenu from './user-menu';
import MobileMenu from './mobile-menu';
import Button from './button';
import { useStateContext } from './state-provider';
import ModalWindow from './modal-window';
import { handleCloseModal, handleOpenModal } from '../../../utils/modalHelpers';

export default function Header() {
  const { currentUser } = useAuthContext();
  const { isOpenMenu, setIsOpenMenu } = useStateContext();

  const menu = useMemo(() => {
    return currentUser ? <UserMenu /> : <AuthMenu />;
  }, [currentUser]);

  return (
    <>
      <header>
        <div className="lg:hidden flex justify-between items-center p-6">
          <Logo />
          <Button
            type="button"
            className="fill-black mobile-button-hover py-2 px-3"
            onClick={() => handleOpenModal(setIsOpenMenu)()}
          >
            <svg width={24} height={24}>
              <use href="/icons/icons.svg#icon-open-menu"></use>
            </svg>
          </Button>
        </div>
        <div className="sm:hidden md:hidden lg:block">
          <div className="flex justify-between items-center max-w-[1184px] h-[88px] px-16 py-5 mx-auto">
            <Logo />
            <Navigation />
            {menu}
          </div>
        </div>
      </header>

      <ModalWindow
        isOpenModal={isOpenMenu}
        onCloseModal={handleCloseModal(setIsOpenMenu)}
      >
        <MobileMenu />
      </ModalWindow>
    </>
  );
}
