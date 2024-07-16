'use client';

import { AnimatePresence, motion, useWillChange, MotionProps } from 'framer-motion';

const stiffness = 400;
const damping = 30;

interface CustomMotionProps extends MotionProps {
  id?: string;
  className?: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

export const MotionDiv = ({ className, isOpen, children, ...props }: CustomMotionProps) => {
  const willChange = useWillChange();

  return (
    <motion.div
      initial={{ width: 48, height: 48 }}
      animate={{
        height: 48,
        width: 'auto'
      }}
      transition={{
        type: 'spring',
        damping,
        stiffness
      }}
      style={{ willChange }}
      className={className}
      {...props}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </motion.div>
  );
};

export const MotionButton = ({ className, isOpen, children, ...props }: CustomMotionProps) => {
  const willChange = useWillChange();

  return (
    <motion.button
      transition={{
        type: 'spring',
        damping,
        stiffness
      }}
      style={{ willChange }}
      className={className}
      {...props}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </motion.button>
  );
};
