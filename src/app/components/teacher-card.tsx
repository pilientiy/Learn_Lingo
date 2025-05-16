'use client';

import React, { useState } from 'react';
import { Teacher } from '../teachers/page';
import Button from './button';
import ModalWindow from './modal-window';
import Login from './login';
import { useStateContext } from './state-provider';
import { handleCloseModal, handleOpenModal } from '../../../utils/modalHelpers';
import { useAuthContext } from './auth-provider';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import TeacherStats from './teacher-stats';
import TeacherReview from './teacher-review';
import TeacherInfo from './teacher-info';
import TeacherAvatar from './teacher-avatar';
import OrderButton from './order-button';

interface TeacherCardProps {
  teacher: Teacher;
}

export default function TeacherCard({ teacher }: TeacherCardProps) {
  const {
    id,
    name,
    surname,
    levels,
    avatar_url,
    reviews,
    languages,
    rating,
    price_per_hour,
    lessons_done,
    lesson_info,
    conditions,
    experience,
  } = teacher;
  const { currentUser } = useAuthContext();
  const { favorites, setFavorites, setIsOpenLog } = useStateContext();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenReview, setIsOpenReview] = useState<boolean>(false);

  const isFavorite = favorites.some((favorite) => favorite.id === teacher.id);

  const addToFavorites = async (teacherId: string) => {
    try {
      if (!currentUser) {
        handleOpenModal(setIsOpenLog)();
        return;
      }

      const userToken = await currentUser?.getIdToken(true);

      const response = await fetch('/api/users/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ teacherId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update favorites');
      }

      const data = await response.json();
      setFavorites(data.updatedFavorites);

      if (isFavorite) {
        toast.success('Removed from "Favorites"');
      } else {
        toast.success('Added to "Favorites"');
      }
    } catch (error) {
      toast.error('Something went wrong! Try again');
    }
  };

  return (
    <>
      <div className="lg:hidden">
        <div className="flex flex-col gap-6 font-medium">
          <div className="flex justify-between items-start gap-3">
            <div className="flex gap-5">
              <TeacherAvatar
                avatarUrl={avatar_url}
                name={name}
                surname={surname}
              />

              <div className="flex items-center">
                <TeacherStats
                  listStyles={'flex flex-col flex-wrap items-start gap-1'}
                  lessonsDone={lessons_done}
                  rating={rating}
                  pricePerHour={price_per_hour}
                />
              </div>
            </div>

            <Button type="button" onClick={() => addToFavorites(id)}>
              <svg
                className={clsx(
                  isFavorite
                    ? 'stroke-red, fill-light-red'
                    : 'stroke-black fill-none hover:fill-light-red hover:stroke-red transition-smooth'
                )}
                width={26}
                height={26}
              >
                <use href="/icons/icons.svg#icon-heart"></use>
              </svg>
            </Button>
          </div>

          <div>
            <TeacherInfo
              name={name}
              surname={surname}
              languages={languages}
              lessonInfo={lesson_info}
              conditions={conditions}
            />

            <div className="mb-8">
              <TeacherReview
                experience={experience}
                reviews={reviews}
                levels={levels}
                isOpenReview={isOpenReview}
                onOpenReview={setIsOpenReview}
              />
            </div>

            <OrderButton isOpenReview={isOpenReview} />
          </div>
        </div>
      </div>

      <div className="sm:hidden md:hidden lg:block">
        <div className="flex gap-12 font-medium">
          <TeacherAvatar avatarUrl={avatar_url} name={name} surname={surname} />

          <div className="w-full">
            <div className="flex justify-between mb-2">
              <p className="sm:hidden md:hidden lg:block text-gray">
                Languages
              </p>

              <TeacherStats
                listStyles={'flex flex-wrap items-start gap-8'}
                lessonsDone={lessons_done}
                rating={rating}
                pricePerHour={price_per_hour}
              />

              <Button type="button" onClick={() => addToFavorites(id)}>
                <svg
                  className={clsx(
                    isFavorite
                      ? 'stroke-red, fill-light-red'
                      : 'stroke-black fill-none hover:fill-light-red hover:stroke-red transition-smooth'
                  )}
                  width={26}
                  height={26}
                >
                  <use href="/icons/icons.svg#icon-heart"></use>
                </svg>
              </Button>
            </div>

            <TeacherInfo
              name={name}
              surname={surname}
              languages={languages}
              lessonInfo={lesson_info}
              conditions={conditions}
            />

            <div className="mb-8">
              <TeacherReview
                experience={experience}
                reviews={reviews}
                levels={levels}
                isOpenReview={isOpenReview}
                onOpenReview={setIsOpenReview}
              />
            </div>

            <OrderButton isOpenReview={isOpenReview} />
          </div>
        </div>

        <ModalWindow
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal(setIsOpenModal)}
        >
          <Login />
        </ModalWindow>
      </div>
    </>
  );
}
