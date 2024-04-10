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
    <div className='flex min-w-80 items-center' key={id}>
      <Button
        className='size-5'
        variant='ghost'
        size='icon'
        onClick={() => removeTask(id)}
      >
        <Cross2Icon className='size-5 text-destructive' />
      </Button>
      <Checkbox
        className='size-5'
        id={id}
        checked={status === 'done'}
        onCheckedChange={() => toggleStatus(id)}
      />
      <div
        className={cn(
          status === 'done' && 'line-through opacity-50',
          'max-w-full break-words font-medium outline-none'
        )}
        id={id}
        onBlur={(e) => {
          editTask(id, szh(e.currentTarget.innerHTML));
        }}
        contentEditable
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
