'use client';

import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = throttle(() => {
    setIsVisible(window.scrollY > 300);
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className="fixed right-8 bottom-8 z-[99]">
      {isVisible && (
        <div
          className="bg-primary hover:bg-opacity-80 hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white shadow-md transition duration-300 ease-in-out"
          aria-label="Scroll to top"
          onClick={handleScrollToTop}
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white" />
        </div>
      )}
    </div>
  );
};
