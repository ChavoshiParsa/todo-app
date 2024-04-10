import TodoList from '@/components/TodoList';

export default function Todo({ params }: { params: { topic: string } }) {
  return (
    <div className='flex size-full w-full flex-col items-center justify-center space-y-8 p-4'>
      <h1 className='text-left text-3xl font-bold'>{params.topic}</h1>
      <TodoList />
    </div>
  );
}
