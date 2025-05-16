import clsx from 'clsx';
import Button from './button';

interface OrderButtonProps {
  isOpenReview: boolean;
}

export default function OrderButton({ isOpenReview }: OrderButtonProps) {
  return (
    <Button
      type="button"
      className={clsx(
        'w-[232px] px-12 py-4 bg-red red-button-hover rounded-xl font-bold',
        isOpenReview ? 'block' : 'hidden'
      )}
    >
      Book trial lesson
    </Button>
  );
}
