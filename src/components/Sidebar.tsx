"use client";

import { DotsVerticalIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useTodoStore } from "@/lib/store";
import AddButtonModal from "./AddButtonModal";
import EditButtonModal from "./EditButtonModal";
import DeleteButtonModal from "./DeleteButtonModal";

export default function Sidebar() {
  const params = useParams<{ todo: string }>();
  const todoTopic = useTodoStore((state) => state.todoTopics);

  return (
    <div className="flex flex-col min-w-[300px] space-y-6 p-6">
      <h1 className="text-2xl font-bold">Topics</h1>
      <div className="flex flex-col justify-center space-y-2">
        {todoTopic.map((topic) => (
          <Link
            className={cn(
              `${params.todo === topic.name.toLowerCase() && "bg-zinc-50"}`,
              "hover:bg-zinc-100 rounded-md flex justify-between items-center py-3 px-6"
            )}
            href={topic.name.toLowerCase()}
            key={topic.name}
          >
            {topic.name}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <DotsVerticalIcon className="size-8 p-1.5 hover:bg-zinc-200 rounded-md" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <EditButtonModal />
                <DeleteButtonModal />
              </DropdownMenuContent>
            </DropdownMenu>
          </Link>
        ))}
      </div>
      <AddButtonModal />
    </div>
  );
}
