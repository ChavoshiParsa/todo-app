import { TrashIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import { useTodoStore } from "@/lib/store";

export default function DeleteButtonModal() {
  const params = useParams<{ todo: string }>();
  const router = useRouter();
  const deleteTopic = useTodoStore((state) => state.deleteTopic);

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-zinc-100 text-zinc-800 px-2 py-1.5 rounded w-full text-sm text-left flex justify-start items-center">
        <TrashIcon className="text-destructive size-4 mr-2" />
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Topic and all its todos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteTopic(params.todo);
              router.push("..");
            }}
          >
            Delete {params.todo} Topic
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
