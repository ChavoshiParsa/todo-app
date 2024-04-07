import AddNewTask from "@/components/AddNewTask";
import TodoList from "@/components/TodoList";

export default function Todo({ params }: { params: { todo: string } }) {
  return (
    <div className="justify-center flex flex-col items-center size-full w-full p-4 space-y-8">
      <h1 className="text-left text-3xl font-bold">
        {params.todo.slice(0, 1).toUpperCase() + params.todo.slice(1)}
      </h1>
      <TodoList />
      <div className="min-w-[200px]">
        <AddNewTask />
      </div>
    </div>
  );
}
