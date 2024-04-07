import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { persist } from "zustand/middleware";

const initial: TodoTopic[] = [
  {
    name: "Exercise",
    tasks: [
      {
        id: uuid(),
        description: "100 push ups with hands",
        status: "undone",
      },
      {
        id: uuid(),
        description: "60 second plank for each arms",
        status: "undone",
      },
      {
        id: uuid(),
        description: "going for walk for 45 minute ",
        status: "undone",
      },
    ],
  },
];

export type Status = "complete" | "undone";

export type Task = {
  id: string;
  description: string;
  status: Status;
};

export type TodoTopic = {
  name: string;
  tasks: Task[];
};

export type State = {
  todoTopics: TodoTopic[];
};

export type Actions = {
  addTask: (name: string, description: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (name: string, id: string, status: Status) => void;
  addTopic: (name: string) => void;
  deleteTopic: (name: string) => void;
  editTopic: (prevName: string, newName: string) => void;
};

export const useTodoStore = create<State & Actions>()(
  persist(
    (set) => ({
      todoTopics: [],
      addTask: (name, description) => {
        set((state) => {
          const pageIndex = state.todoTopics.findIndex(
            (page) => page.name.toLowerCase() === name.toLowerCase()
          );

          if (pageIndex !== -1) {
            const newTask: Task = {
              id: uuid(),
              description,
              status: "undone",
            };

            const updatedTodoTopics = [...state.todoTopics];
            updatedTodoTopics[pageIndex].tasks.push(newTask);

            return {
              ...state,
              todoTopics: updatedTodoTopics,
            };
          }

          return state;
        });
      },
      deleteTask: (id) => {
        set((state) => {
          const updatedTodoTopics = state.todoTopics.map((topic) => ({
            ...topic,
            tasks: topic.tasks.filter((task) => task.id !== id),
          }));

          return {
            ...state,
            todoTopics: updatedTodoTopics,
          };
        });
      },

      updateTask: (name, id, status) => {
        set((state) => {
          const pageIndex = state.todoTopics.findIndex(
            (page) => page.name.toLowerCase() === name
          );

          if (pageIndex !== -1) {
            const updatedTasks = state.todoTopics[pageIndex].tasks.map(
              (task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    status: status,
                  };
                }
                return task;
              }
            );

            const updatedTodoTopics = [...state.todoTopics];

            updatedTodoTopics[pageIndex] = {
              ...updatedTodoTopics[pageIndex],
              tasks: updatedTasks,
            };

            return {
              ...state,
              todoTopics: updatedTodoTopics,
            };
          }

          return state;
        });
      },
      addTopic: (name) => {
        set((state) => ({
          todoTopics: [...state.todoTopics, { name, tasks: [] }],
        }));
      },
      deleteTopic: (name) => {
        set((state) => ({
          todoTopics: state.todoTopics.filter(
            (page) => page.name.toLowerCase() !== name
          ),
        }));
      },
      editTopic: (prevName, newName) => {
        set((state) => ({
          todoTopics: state.todoTopics.map((page) =>
            page.name.toLowerCase() === prevName
              ? { ...page, name: newName }
              : page
          ),
        }));
      },
    }),
    { name: "task-store" }
  )
);
