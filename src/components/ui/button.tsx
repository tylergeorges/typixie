'use client';

import { cn } from '@/utils/cn';

export const Button = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={cn('appearance-none bg-primary p-2 font-semibold text-background', className)}
      {...props}
    >
      {children}
    </button>
  );
};
