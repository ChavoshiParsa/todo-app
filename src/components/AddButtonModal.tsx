import { FilePlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
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
import { useTodoStore } from "@/lib/store";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function AddButtonModal() {
  const router = useRouter();
  const name = useRef<HTMLInputElement>(null);

  const todoTopic = useTodoStore((state) => state.todoTopics);
  const addTopic = useTodoStore((state) => state.addTopic);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-6 w-full">
          <FilePlusIcon className="mr-2 size-5" />
          New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Topic</DialogTitle>
        </DialogHeader>
        <Input
          className=""
          id="name"
          name="name"
          ref={name}
          placeholder="Topic Name..."
          autoComplete="off"
        />

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button
              onClick={() => {
                const nameInput = name.current?.value;

                const index = todoTopic.findIndex(
                  (topic) =>
                    topic.name.toLowerCase() === nameInput?.toLowerCase()
                );
                if (index !== -1) return;
                if (!nameInput) return;
                addTopic(nameInput);
                router.push(nameInput.toLowerCase());
              }}
            >
              Add New Topic
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
