'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/utils/cn';
import type { Theme } from '@/components/typixie/types';

import { MotionDiv } from '@/components/motion';
import { ThemeButton } from '@/components/theme-button';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { useKeyDown } from '@/hooks/use-key-down';

const themes: Theme[] = [
  {
    idx: 0,
    name: 'Expresso'
  },
  {
    idx: 1,
    name: 'Oxocarbon'
  },
  {
    idx: 2,
    name: 'Blackhole'
  },
  {
    idx: 3,
    name: 'Eudaemonia'
  }
];

export const ThemeSwitcher = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { theme: currentTheme } = useTheme();
  const buttonWrapperRef = useRef<HTMLDivElement>(null);

  const themeClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useOnClickOutside(buttonWrapperRef, () => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  });

  useKeyDown(() => {
    if (!isCollapsed) {
      setIsCollapsed(true);
    }
  });

  if (!isMounted || !currentTheme) return null;

  const currentThemeIdx = Number(currentTheme.slice(currentTheme?.length - 1));

  return (
    <MotionDiv
      ref={buttonWrapperRef}
      initial={{ width: 48, height: 48 }}
      animate={{
        height: 48,
        width: 'auto'
      }}
      className={cn(
        'relative z-10 cursor-pointer gap-2 overflow-hidden rounded-full bg-tertiary p-2 horizontal center'
      )}
      layout
    >
      {themes
        .sort((a: Theme) => (a.idx === currentThemeIdx ? -1 : 0))
        .map(theme => (
          <ThemeButton
            collapsed={isCollapsed}
            onClick={themeClick}
            theme={theme}
            key={`${theme.name}-${theme.idx}`}
          />
        ))}
    </MotionDiv>
  );
};
