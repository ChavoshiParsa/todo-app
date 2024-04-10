"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useTodoStore } from "@/lib/store";

export default function Sidebar() {
  const params = useParams<{ todo: string }>();
  const topics = useTodoStore((state) =>
    Array.from(new Set(state.tasks.map((task) => task.title)))
  );

  return (
    <div className="flex flex-col justify-center space-y-2">
      {topics.map((topic) => (
        <Link
          className={cn(
            params.todo === topic && "bg-zinc-50",
            "hover:bg-zinc-100 rounded-md flex justify-between items-center py-3 px-6"
          )}
          href={topic}
          key={topic}
        >
          {topic}
        </Link>
      ))}
    </div>
  );
}
