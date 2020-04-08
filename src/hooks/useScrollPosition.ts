import { throttle } from 'lodash';
import { useCallback, useLayoutEffect, useState } from 'react';

const getScrollPosition = () => ({
  top: window.scrollY,
  right:
    document.documentElement.scrollWidth - document.documentElement.clientWidth - window.scrollX,
  bottom:
    document.documentElement.scrollHeight - document.documentElement.clientHeight - window.scrollY,
  left: window.scrollX,
});

export default (delay = 500) => {
  const [scrollPosition, setScrollPosition] = useState(getScrollPosition());
  const handleScroll = useCallback(
    throttle(() => {
      setScrollPosition(getScrollPosition());
    }, delay),
    [],
  );

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return scrollPosition;
};
