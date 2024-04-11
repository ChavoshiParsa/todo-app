'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { useTodoStore, useUIStore } from '@/lib/store';
import { useState } from 'react';

export default function Sidebar() {
  const { topicParams } = useParams<{ topicParams: string }>();
  const router = useRouter();
  const [newTopic, setNewTopic] = useState('');

  const topics = useTodoStore((state) =>
    Array.from(new Set(state.tasks.map((task) => task.title)))
  );
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const setMenu = useUIStore((state) => state.setMenu);

  return (
    <div className='flex flex-col items-center justify-center space-y-1 p-6 text-lg font-medium sm:text-xl'>
      {topics.map((topic) => (
        <Link
          className={cn(
            topic === decodeURIComponent(topicParams)
              ? 'bg-zinc-200 dark:bg-zinc-800'
              : 'bg-zinc-50 dark:bg-zinc-900',
            'w-52 rounded-lg px-4 py-2 hover:bg-zinc-100 hover:dark:bg-zinc-700'
          )}
          href={topic}
          key={topic}
          onClick={() => setMenu(false)}
        >
          <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {decodeURIComponent(topic)}
          </p>
        </Link>
      ))}
      {topicParams && !topics.includes(decodeURIComponent(topicParams)) && (
        <Link
          className='w-52 rounded-lg bg-zinc-200 px-4 py-2 hover:bg-zinc-100 dark:bg-zinc-800 hover:dark:bg-zinc-700'
          href={topicParams}
          key={topicParams}
        >
          <p className='overflow-hidden text-ellipsis whitespace-nowrap'>
            {decodeURIComponent(topicParams)}
          </p>
        </Link>
      )}
      {topicParams && (
        <input
          className={cn(
            `${isMenuOpen && 'placeholder:text-zinc-800 dark:placeholder:text-zinc-300'}`,
            'w-52 break-words bg-transparent px-4 py-2 outline-none'
          )}
          name='topic'
          placeholder='new Topic ...'
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onBlur={() => {
            if (newTopic !== '') {
              router.push(newTopic);
              setNewTopic('');
              setMenu(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && newTopic !== '') {
              router.push(newTopic);
              setNewTopic('');
              setMenu(false);
            }
          }}
        />
      )}
    </div>
  );
}
