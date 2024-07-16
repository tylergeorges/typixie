import { IS_SERVER } from '@/utils/is-server';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
