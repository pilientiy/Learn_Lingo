'use client';

import React, { useEffect, useState } from 'react';
import TeachersList from '../components/teachers-list';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { useStateContext } from '../components/state-provider';
import { useAuthContext } from '../components/auth-provider';
import Loader from '../components/loader';
import { useRouter } from 'next/navigation';
import { handleOpenModal } from '../../../utils/modalHelpers';

export default function FavoritesPage() {
  const { currentUser } = useAuthContext();
  const { favorites, setFavorites, setIsOpenLog } = useStateContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.replace('/');
      handleOpenModal(setIsOpenLog)();
    }
  }, [currentUser, router, setIsOpenLog]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const userToken = await currentUser?.getIdToken(true);

        if (!userToken) {
          return;
        }

        const response = await fetch('/api/users/favorites', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (!response.ok) {
          return toast.error('Something went wrong! Try again');
        }

        const data = await response.json();
        setFavorites(data.favorites);
      } catch (error) {
        toast.error('Something went wrong! Try again');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser, setFavorites]);

  return (
    <div className="bg-guyabano w-full h-[87vh]">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-[1184px] py-8 px-16 mx-auto">
          {favorites == null || favorites.length === 0 ? (
            <div className="flex flex-col gap-8 justify-center items-center">
              <p className="text-xl italic font-medium">
                You don&apos;t have favorite teachers yet
              </p>
              <Link
                className="flex gap-2 justify-center items-center text-xl bg-red px-3 py-2 rounded-xl red-button-hover"
                href={'/teachers'}
              >
                <p>Go to the catalog of teachers</p>
                <svg width={14} height={14}>
                  <use href="/icons/icons.svg#icon-arrow-right"></use>
                </svg>
              </Link>
            </div>
          ) : (
            <TeachersList teachers={favorites} />
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}
