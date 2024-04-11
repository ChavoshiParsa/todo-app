'use client';

import { useTodoStore } from '@/lib/store';
import { useParams } from 'next/navigation';
import TodoItem from './TodoItem';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function TodoList() {
  const { topicParams } = useParams<{ topicParams: string }>();

  const [newTodo, setNewTodo] = useState('');

  const tasks = useTodoStore((state) => state.tasks);
  const addTask = useTodoStore((state) => state.addTask);

  const filteredTasks = tasks.filter(
    (task) => task.title === decodeURIComponent(topicParams)
  );

  return (
    <div className='flex flex-col items-start justify-center space-y-2 text-lg sm:text-xl'>
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
      <input
        className={cn(
          `${filteredTasks.length !== 0 && 'pl-14'}`,
          'w-60 break-words bg-transparent font-medium outline-none'
        )}
        id='todo'
        placeholder='new todo ...'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onBlur={() => {
          if (newTodo !== '') {
            addTask(topicParams, newTodo);
            setNewTodo('');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && newTodo !== '') {
            addTask(topicParams, newTodo);
            setNewTodo('');
          }
        }}
      />
    </div>
  );
}
