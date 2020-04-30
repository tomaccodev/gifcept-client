import { useEffect, useRef } from 'react';

import EventEmitter, { Event } from '../events';

export default <T>(event: Event, handler: (payload: T) => void) => {
  const savedHandler = useRef<(payload: T) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (payload: T) => savedHandler.current && savedHandler.current(payload);

    // Add event listener
    EventEmitter.on(event, eventListener);

    // Remove event listener on cleanup
    return () => {
      EventEmitter.off(event, eventListener);
    };
  }, [event]);
};
