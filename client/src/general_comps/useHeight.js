import { useEffect, useState } from 'react';

const useScrollHeight = () => {
  const [scrollHeight, setScrollHeight] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollHeight(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollHeight;
};

export default useScrollHeight;
