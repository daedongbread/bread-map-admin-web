import { useEffect, useRef } from 'react';

const useOnClickOutside = (isOpen: boolean, handler?: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickOutsideHandler = (event: MouseEvent) => {
    if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
      handler && handler();
    }
  };

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  });
  return { containerRef };
};

export default useOnClickOutside;
