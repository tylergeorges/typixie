import { entries } from '@/utils/object';

const getClassString = (className: string) => className.split(' ');

const setClassName = (element: HTMLElement, className: string) => {
  const classes = getClassString(className);

  element.classList.add(...classes);
};

const removeClassName = (element: HTMLElement, className: string) => {
  const classes = getClassString(className);

  element.classList.remove(...classes);
};

export const set = (
  el: HTMLElement | React.RefObject<HTMLElement | undefined | null> | null | undefined,
  styles: React.CSSProperties | string
) => {
  const element = el instanceof HTMLElement ? el : el?.current;

  if (!element) return;

  if (typeof styles === 'string') {
    if (!element.classList.contains(styles)) {
      setClassName(element, styles);
    }

    return;
  }

  const styleEntries = entries(styles);

  if (!styleEntries.length) return;

  for (let i = 0; i < styleEntries.length; i++) {
    const [key, val] = styleEntries[i];

    (element.style as any)[key] = val;
  }
};

export const remove = (
  el: HTMLElement | React.RefObject<HTMLElement | undefined | null> | null | undefined,
  styles: React.CSSProperties | string
) => {
  const element = el instanceof HTMLElement ? el : el?.current;

  if (!element) return;

  if (typeof styles === 'string') {
    removeClassName(element, styles);

    return;
  }

  const styleEntries = entries(styles);

  if (!styleEntries.length) return;

  for (let i = 0; i < styleEntries.length; i++) {
    const [key] = styleEntries[i];

    (element.style as any)[key] = '';
  }
};

export function setLetterStyle(letter: Element | undefined | null, style: string) {
  set(letter as HTMLElement, style);
}

export function removeLetterStyle(letter: Element | undefined | null, style: string) {
  remove(letter as HTMLElement, style);
}
