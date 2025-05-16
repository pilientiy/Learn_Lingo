import clsx from 'clsx';
import React from 'react';

interface HashtagItemProps {
  children: React.ReactNode;
  className?: string;
}

export default function HashtagItem({ children, className }: HashtagItemProps) {
  return <p className={clsx('inline-block py-2 px-3 border border-solid border-pale-black rounded-[38px]', className)}>{`#${children}`}</p>;
}
