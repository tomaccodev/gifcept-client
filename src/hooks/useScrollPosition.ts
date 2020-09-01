import { throttle } from 'lodash';
import { useCallback, useLayoutEffect, useState } from 'react';

interface ScrollPosition {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const getScrollPosition = (): ScrollPosition => ({
  top: window.scrollY,
  right:
    document.documentElement.scrollWidth - document.documentElement.clientWidth - window.scrollX,
  bottom:
    document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY,
  left: window.scrollX,
});

export default (delay = 500): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState(getScrollPosition());
  const handleScroll = useCallback(
    throttle(() => {
      setScrollPosition(getScrollPosition());
    }, delay),
    [],
  );

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return (): void => window.removeEventListener('scroll', handleScroll);
  });

  return scrollPosition;
};
