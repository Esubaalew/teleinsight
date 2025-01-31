// components/manygils.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Manygils = () => {
  const router = useRouter();

  useEffect(() => {
    const checkScreenWidth = () => {
      if (window.innerWidth < 768) {
        router.push('/desktop-only');
      }
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);

    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, [router]);

  return null;
};

export default Manygils;