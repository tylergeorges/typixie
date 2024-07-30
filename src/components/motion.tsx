'use client';

import { AnimatePresence, motion, useWillChange, MotionProps } from 'framer-motion';
import { forwardRef } from 'react';

const stiffness = 400;
const damping = 30;

interface CustomMotionProps extends MotionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

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

export const MotionButton = forwardRef<HTMLButtonElement, CustomMotionProps>(
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
