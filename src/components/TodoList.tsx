'use client';

import { useTodoStore } from '@/lib/store';
import { useParams } from 'next/navigation';
import TodoItem from './TodoItem';
import { useState } from 'react';

export default function TodoList() {
  const { topic } = useParams<{ topic: string }>();
  const [newTodo, setNewTodo] = useState('');

  const tasks = useTodoStore((state) => state.tasks);
  const addTask = useTodoStore((state) => state.addTask);

  const filteredTasks = tasks.filter((task) => task.title === topic);

  return (
    <div className='flex flex-col items-start justify-center'>
      {filteredTasks.map((task) => (
        <TodoItem key={task.id} task={task} />
      ))}
      <input
        className='max-w-full break-words font-medium outline-none'
        placeholder='// new todo ...'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onBlur={() => {
          if (newTodo !== '') {
            addTask(topic, newTodo);
            setNewTodo('');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && newTodo !== '') {
            addTask(topic, newTodo);
            setNewTodo('');
          }
        }}
      />
    </div>
  );
}
