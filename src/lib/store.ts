import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';

const initial: Task[] = [
  {
    id: '0',
    title: 'Exercise',
    description: '100 push ups with hands',
    status: 'undone',
  },
  {
    id: '1',
    title: 'Exercise',
    description: '60 second plank for each arms',
    status: 'undone',
  },
  {
    id: '2',
    title: 'Exercise',
    description: 'going for walk for 45 minute ',
    status: 'undone',
  },
];

export type Status = 'done' | 'undone';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  addTask: (title: string, description: string) => void;
  toggleStatus: (id: string) => void;
  editTask: (id: string, newDescription: string) => void;
  removeTask: (id: string) => void;
};

export const useUIStore = create<
  { isMenuOpen: boolean } & {
    toggleMenu: () => void;
    setMenu: (value: boolean) => void;
  }
>((set) => ({
  isMenuOpen: false,
  toggleMenu() {
    set((state) => ({ isMenuOpen: !state.isMenuOpen }));
  },
  setMenu(value) {
    set(() => ({ isMenuOpen: value }));
  },
}));

export const useTodoStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: [],
      addTask(title, description) {
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: state.tasks.length.toString(),
              title: decodeURIComponent(title.trim()),
              description: description.trim(),
              status: 'undone',
            },
          ],
        }));
      },
      toggleStatus(id) {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'undone' ? 'done' : 'undone',
                }
              : { ...task }
          ),
        }));
      },
      editTask(id, newDescription) {
        set((state) => {
          if (newDescription.trim() === '')
            return {
              tasks: state.tasks.filter((task) => task.id !== id),
            };
          return {
            tasks: state.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    description: newDescription.trim(),
                  }
                : { ...task }
            ),
          };
        });
      },
      removeTask(id) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
    }),
    { name: 'task-store' }
  )
);
