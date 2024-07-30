'use client';

import { AnimatePresence, motion, useWillChange, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactHTML } from 'react';

const stiffness = 400;
const damping = 30;

export type CustomMotionProps<T extends keyof ReactHTML = 'div'> = HTMLMotionProps<T> & {
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export const MotionDiv = forwardRef<HTMLDivElement, CustomMotionProps>(
  ({ className, children, ...props }, ref) => {
    const willChange = useWillChange();

    return (
      <motion.div
        transition={{
          type: 'spring',
          damping,
          stiffness
        }}
        style={{ willChange }}
        className={className}
        {...props}
        ref={ref}
      >
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = 'MotionDiv';

export const MotionButton = forwardRef<HTMLButtonElement, CustomMotionProps<'button'>>(
  ({ className, children, ...props }, ref) => {
    const willChange = useWillChange();

    return (
      <motion.button
        transition={{
          type: 'spring',
          damping,
          stiffness
        }}
        tabIndex={-1}
        style={{ willChange }}
        className={className}
        {...props}
        ref={ref}
      >
        <AnimatePresence>{children}</AnimatePresence>
      </motion.button>
    );
  }
);

MotionButton.displayName = 'MotionButton';
