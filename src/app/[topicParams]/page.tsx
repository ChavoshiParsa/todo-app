'use client';
import TodoList from '@/components/TodoList';
import { useUIStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function Todo({ params }: { params: { topicParams: string } }) {
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);

  return (
    <div
      className={cn(
        `${isMenuOpen && 'blur-sm'}`,
        'mx-auto flex flex-col space-y-5 p-6'
      )}
    >
      <h1 className='text-left  text-2xl font-bold sm:text-4xl'>
        {decodeURIComponent(params.topicParams)}
      </h1>
      <TodoList />
    </div>
  );
}
