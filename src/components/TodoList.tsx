"use client";

import { useTodoStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

export default function TodoList() {
  const params = useParams<{ todo: string }>();
  const todoTopic = useTodoStore((state) => state.todoTopics);
  const updateTask = useTodoStore((state) => state.updateTask);
  const deleteTask = useTodoStore((state) => state.deleteTask);
  const list = todoTopic.find(
    (topic) => topic.name.toLowerCase() === params.todo.toLowerCase()
  );

  return (
    <div className="flex flex-col">
      {list?.tasks.map((task) => (
        <div className="flex items-center space-x-2" key={task.id}>
          <Button
            className=""
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task.id)}
          >
            <TrashIcon className="text-destructive size-5" />
          </Button>
          <Checkbox
            id={task.id}
            name="todo"
            checked={task.status === "complete"}
            onCheckedChange={() => {
              if (task.status === "complete") {
                updateTask(params.todo, task.id, "undone");
              } else {
                updateTask(params.todo, task.id, "complete");
              }
            }}
          />
          <Label
            htmlFor={task.id}
            className={cn(`${task.status === "complete" && "line-through"}`)}
          >
            {task.description}
          </Label>
        </div>
      ))}
    </div>
  );
}
