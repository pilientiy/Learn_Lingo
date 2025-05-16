'use client';

import Link from 'next/link';
import React from 'react';
import { useStateContext } from './state-provider';
import { handleCloseModal } from '../../../utils/modalHelpers';

export default function Logo() {
  const { setIsOpenMenu } = useStateContext();

  return (
    <div className="scale-100 hover:scale-110 transition-smooth">
      <Link
        href={'/'}
        onClick={() => {
          handleCloseModal(setIsOpenMenu)();
        }}
        className="flex gap-2"
      >
        <svg width={28} height={28}>
          <use href="/icons/icons.svg#icon-ukraine"></use>
        </svg>
        <span className="sm:text-2xl md:text-2xl lg:text-xl font-medium tracking-tighter">
          LearnLingo
        </span>
      </Link>
    </div>
  );
}
