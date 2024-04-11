import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { ModeToggle } from './ModeToggle';
import { useUIStore } from '@/lib/store';

export default function Navbar() {
  const toggleMenu = useUIStore((state) => state.toggleMenu);

  return (
    <nav className='flex w-full items-center justify-between p-6'>
      <li className='list-none'>
        <Button variant='ghost' size='icon' onClick={() => toggleMenu()}>
          <HamburgerMenuIcon className='size-6' />
        </Button>
      </li>
      <li className='list-none'>
        <ModeToggle />
      </li>
    </nav>
  );
}
