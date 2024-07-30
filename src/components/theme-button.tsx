'use client';

import { AnimatePresence } from 'framer-motion';
import { tv, VariantProps } from 'tailwind-variants';
import { useTheme } from 'next-themes';

import type { Theme } from '@/components/typixie/types';
import { cn } from '@/utils/cn';

import { Button } from '@/components/ui/button';
import { MotionButton, MotionDiv } from '@/components/motion';

const themeButton = tv({
  base: 'relative size-8 scale-90 rounded-full bg-primary',

  variants: {
    active: {
      true: 'z-10',
      false: 'z-0'
    },

    collapsed: {
      true: '',
      false: ''
    }
  },

  compoundVariants: [
    {
      active: false,
      collapsed: true,
      className: 'absolute'
    },
    {
      active: false,
      collapsed: false,
      className: ''
    }
  ]
});

type ThemeButtonVariants = VariantProps<typeof themeButton>;

interface ThemeButtonProps
  extends VariantOmit<ThemeButtonVariants, React.ComponentProps<typeof Button>> {
  theme: Theme;
}

export const ThemeButton = ({
  children,
  onClick,
  active,
  className,
  theme,
  collapsed,
  ...props
}: ThemeButtonProps) => {
  const { setTheme, theme: currentTheme } = useTheme();

  const themeName = `theme${theme.idx}`;

  const isActive = currentTheme === themeName;

  return (
    <AnimatePresence>
      <MotionButton
        layout
        tabIndex={-1}
        data-theme={themeName}
        onClick={e => {
          if (onClick) {
            onClick(e);
          }

          if (!collapsed && !isActive) {
            setTheme(themeName);
          }
        }}
        animate={{
          opacity: !isActive ? (collapsed ? 0 : 1) : 1,

          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 30,
            duration: 10
          }
        }}
        className={cn(themeButton({ active: isActive, collapsed }))}
        {...props}
      ></MotionButton>

      {isActive && !collapsed && (
        <MotionDiv
          layout
          animate={{
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
              duration: 10
            }
          }}
          data-theme={themeName}
          className={cn('z-10 font-mono font-medium text-primary')}
        >
          {theme.name}
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
