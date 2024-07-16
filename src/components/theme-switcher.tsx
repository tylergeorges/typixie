'use client';

import { useEffect, useState } from 'react';

import { MotionDiv } from '@/components/motion';
import { ThemeButton } from '@/components/theme-button';
import { cn } from '@/utils/cn';

const themes = Array(4).fill(0);

export const ThemeSwitcher = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const themeClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();

    setIsCollapsed(prev => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <MotionDiv
      data-isOpen={!isCollapsed}
      isOpen={!isCollapsed}
      className={cn(
        'relative z-10 cursor-pointer gap-2 overflow-hidden rounded-full bg-tertiary p-2 horizontal center'
      )}
      layout
      onClick={themeClick}
    >
      {themes.map((_, idx) => (
        <ThemeButton collapsed={isCollapsed} onClick={themeClick} theme={idx} key={idx} />
      ))}
    </MotionDiv>
  );
};
