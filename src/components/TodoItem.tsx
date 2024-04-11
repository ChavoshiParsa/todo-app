import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import { Task, useTodoStore } from '@/lib/store';
import { Checkbox } from './ui/checkbox';
import { cn, szh } from '@/lib/utils';

export default function TodoItem({ task }: { task: Task }) {
  const { id, description, status } = task;
  const { toggleStatus, editTask, removeTask } = useTodoStore((state) => ({
    ...state,
  }));

  return (
    <div className='flex items-start justify-start space-x-2' key={id}>
      <Button
        className='mt-1 size-5'
        variant='ghost'
        size='icon'
        onClick={() => removeTask(id)}
      >
        <Cross2Icon className='dark: size-5 text-red-600 dark:text-red-500 ' />
      </Button>
      <Checkbox
        className='mt-1 size-5'
        id={id}
        checked={status === 'done'}
        onCheckedChange={() => toggleStatus(id)}
      />
      <div
        className={cn(
          status === 'done' && 'line-through opacity-50',
          'max-w-[600px] break-words font-medium outline-none'
        )}
        id={id}
        onBlur={(e) => editTask(id, szh(e.currentTarget.innerHTML))}
        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        contentEditable
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
