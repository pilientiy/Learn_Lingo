'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from './button';
import toast from 'react-hot-toast';
import { useAuthContext } from './auth-provider';
import { getAuth, signOut } from 'firebase/auth';
import { handleCloseModal } from '../../../utils/modalHelpers';
import { useStateContext } from './state-provider';

export default function UserMenu() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const { setIsOpenMenu, setFavorites } = useStateContext();

  const logout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      toast.success('You have been logged out');
      handleCloseModal(setIsOpenMenu);
      setFavorites([]);
      router.push('/');
    } catch (error) {
      toast.error('Logout error. Please try again!');
    }
  };
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <p className="font-medium italic text-red">
        {currentUser ? `Hello, ${currentUser.displayName}!` : null}
      </p>
      <Button
        type={'button'}
        onClick={logout}
        className={
          'flex gap-2.5 justify-center items-center font-bold leading-tight outline-none stroke-red hover:stroke-black focus:stroke-black transition-smooth'
        }
      >
        <svg width={20} height={20}>
          <use href="/icons/icons.svg#icon-log-in"></use>
        </svg>
        <span>Log out</span>
      </Button>
    </div>
  );
}
