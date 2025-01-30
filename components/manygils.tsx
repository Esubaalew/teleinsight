

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Manygils = () => {
  const router = useRouter();

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 768) {
        // Redirect to /desktop-only if the screen width is less than 768px
        router.push('/desktop-only');
      }
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [router]);

  return null; // This component doesn't render anything visible
};

export default Manygils;