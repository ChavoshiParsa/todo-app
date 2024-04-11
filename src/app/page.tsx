'use client';

import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const [newTopic, setNewTopic] = useState('');
  const router = useRouter();
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);

  return (
    <div
      className={cn(
        `${isMenuOpen && 'blur-sm'}`,
        'mx-auto mt-20 flex flex-col space-y-4 p-6'
      )}
    >
      <h1 className='text-center text-xl font-bold sm:text-3xl'>
        Select a topic or create new one
      </h1>
      <input
        className='break-words bg-transparent px-4 py-2 text-center text-xl font-medium outline-none sm:text-2xl'
        name='topic'
        placeholder='new Topic ...'
        value={newTopic}
        onChange={(e) => setNewTopic(e.target.value)}
        onBlur={() => {
          if (newTopic !== '') {
            router.push(newTopic);
            setNewTopic('');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && newTopic !== '') {
            router.push(newTopic);
            setNewTopic('');
          }
        }}
      />
    </div>
  );
}
