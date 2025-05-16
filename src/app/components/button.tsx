import React from 'react';

export type ButtonType = 'submit' | 'reset' | 'button';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type: ButtonType;
}

export default function Button({
  children,
  onClick,
  className,
  type,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
