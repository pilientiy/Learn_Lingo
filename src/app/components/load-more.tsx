import React from 'react';
import Button from './button';

interface LoadMoreProps {
  onLoadMore: () => void;
  isLoading: boolean;
}

export default function LoadMore({ onLoadMore, isLoading }: LoadMoreProps) {
  return (
    <Button
      className="w-36 px-4 py-2 mx-auto bg-red red-button-hover rounded-xl font-bold"
      type="button"
      onClick={onLoadMore}
      disabled={isLoading}
    >
      Load more
    </Button>
  );
}
