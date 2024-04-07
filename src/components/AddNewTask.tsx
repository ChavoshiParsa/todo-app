"use client";

import { Button } from "./ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useRef } from "react";
import { useTodoStore } from "@/lib/store";
import { useParams } from "next/navigation";

export default function AddNewTask() {
  const params = useParams<{ todo: string }>();
  const todo = useRef<HTMLInputElement>(null);
  const addTask = useTodoStore((state) => state.addTask);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-3 w-full">
          <PlusCircledIcon className="mr-2 size-5" />
          New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Todo</DialogTitle>
        </DialogHeader>
        <Input
          className=""
          id="name"
          name="name"
          ref={todo}
          placeholder="Topic Name..."
          autoComplete="off"
        />
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => {
                const description = todo.current?.value;
                if (!description) return;
                addTask(params.todo, description);
              }}
            >
              Add New Todo
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
