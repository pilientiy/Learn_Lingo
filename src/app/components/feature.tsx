import React from 'react';

interface FeatureProps {
  number: string;
  description: string;
}

export default function Feature({ number, description }: FeatureProps) {
  return (
    <div className='sm:w-full flex items-center gap-4'>
      <p className='sm:text-[18px] font-medium text-[28px] leading-tight'>{number} +</p>
      <p className='w-[92px] text-sm leading-snug tracking-tight text-text-color-muted'>{description}</p>
    </div>
  );
}
