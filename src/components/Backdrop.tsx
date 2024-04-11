'use client';

import { useUIStore } from '@/lib/store';

export default function Backdrop() {
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);

  return (
    <>
      {isMenuOpen && <div className='fixed inset-0 z-20 bg-black opacity-25' />}
    </>
  );
}
