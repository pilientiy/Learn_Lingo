'use client';

import { useMemo } from 'react';
import { useAuthContext } from './auth-provider';
import UserMenu from './user-menu';
import AuthMenu from './auth-menu';
import Logo from './logo';
import Navigation from './navigation';
import Button from './button';
import { useStateContext } from './state-provider';
import { handleCloseModal } from '../../../utils/modalHelpers';

export default function MobileMenu() {
  const { currentUser } = useAuthContext();
  const { setIsOpenMenu } = useStateContext();

  const menu = useMemo(() => {
    return currentUser ? <UserMenu /> : <AuthMenu />;
  }, [currentUser]);

  return (
    <div className="flex flex-col justify-around items-center w-full h-[600px] bg-white rounded-xl text-lg">
      <Button
        type="button"
        className="fill-black mobile-button-hover absolute top-6 right-6 z-50 py-2 px-3"
        onClick={() => handleCloseModal(setIsOpenMenu)()}
      >
        <svg width={16} height={16}>
          <use href="/icons/icons.svg#icon-close-menu"></use>
        </svg>
      </Button>
      <Logo />
      <Navigation />
      {menu}
    </div>
  );
}
