'use client';
import { useUIStore } from '@/lib/store';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function Menu() {
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const toggleMenu = useUIStore((state) => state.toggleMenu);

  return (
    <>
      {isMenuOpen && (
        <div className='absolute left-0 top-0 z-30 flex flex-col sm:hidden'>
          <Button
            className='mx-6 mt-6'
            variant='secondary'
            size='icon'
            onClick={() => toggleMenu()}
          >
            <HamburgerMenuIcon className='size-6' />
          </Button>
          <Sidebar />
        </div>
      )}
      <div className='sm:hidden'>
        <Navbar />
      </div>
      <div className='relative hidden sm:block'>
        <Sidebar />
        <div className='fixed right-6 top-6'>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
