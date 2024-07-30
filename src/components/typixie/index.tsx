'use client';

import { Fragment } from 'react';

import { cn } from '@/utils/cn';
import { useAppActions, useAppStore } from '@/lib/state';

import { Row } from '@components/flex';
import { Caret } from '@/components/typixie/caret';

export const Typixie = () => {
  const { setActiveWord, setScroller } = useAppActions();
  const words = useAppStore(state => state.words);

  return (
    <div style={{ gridColumn: 'full-width' }} className="relative flex max-w-2xl lg:max-w-5xl">
      <Row className="relative mt-20 max-h-[10em] text-center font-mono text-xl md:text-2xl md:leading-[1.3] lg:text-[40px]">
        <div className="">
          <div
          // ref={el => {
          //   if (el) {
          //     setScroller(el);
          //   }
          // }}
          // style={{ '--depth': '0px', '--top-offset':'2em' }}
          // className={cn(
          //   `translate-y-[calc(var(--depth, 0px) + var(--top-offset))] relative transition duration-300`
          // )}
          >
            <Caret />

            <div className="text-center">
              {words.map((word, idx) => (
                <Fragment key={`${word}-${idx}`}>
                  <div
                    ref={el => {
                      if (idx === 0 && el) {
                        setActiveWord(el);
                      }
                    }}
                    className="word mb-4 inline-flex text-center leading-[1.3] text-tertiary"
                  >
                    {word.split('').map((letter, letterIdx) => (
                      <span
                        className={cn('block p-[.03em] text-center leading-[1.3]')}
                        key={`${letter}-${letterIdx}`}
                      >
                        {letter === ' ' ? <>&nbsp;</> : letter}
                      </span>
                    ))}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};
