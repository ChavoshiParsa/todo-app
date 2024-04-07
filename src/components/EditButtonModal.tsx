import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useRef } from "react";
import { useTodoStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";

export default function EditButtonModal() {
  const params = useParams<{ todo: string }>();
  const router = useRouter();
  const newName = useRef<HTMLInputElement>(null);
  const editTopic = useTodoStore((state) => state.editTopic);

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-zinc-100 text-zinc-800 px-2 py-1.5 rounded w-full text-sm text-left flex justify-start items-center">
        <Pencil2Icon className="text-zinc-800 size-4 mr-2" />
        Edit
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
        <Input
          className=""
          id="newName"
          name="newName"
          ref={newName}
          placeholder={params.todo}
          autoComplete="off"
        />
        <DialogFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              const newNameInput = newName.current?.value;
              if (!newNameInput) return;
              editTopic(params.todo, newNameInput);
              router.push(newNameInput.toLowerCase());
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
