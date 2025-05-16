import React from 'react';

interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

interface ReviewProps {
  review: Review;
}

export default function Review({ review }: ReviewProps) {
  const { comment, reviewer_name, reviewer_rating } = review;
  return (
    <div className='mb-8'>
      <div className="flex">
        <div className="flex justify-center items-center w-11 h-11 border border-light-red rounded-full mr-3 bg-pastel-red">
          <p className="text-red">{reviewer_name.slice(0, 1)}</p>
        </div>
        <div className='mb-4'>
          <p className='text-text-color-gray'>{reviewer_name}</p>
          <p className='flex justify-center items-center gap-2'>
            <svg className="stroke-black fill-none" width={16} height={16}>
              <use href="/icons/icons.svg#icon-star"></use>
            </svg>
            <span>{`${reviewer_rating}.0`}</span>
          </p>
        </div>
      </div>
      <p>{comment}</p>
    </div>
  );
}
