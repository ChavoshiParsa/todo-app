"use client";

import NewTopicModal from "@/components/AddButtonModal";
import { useTodoStore } from "@/lib/store";

export default function Home() {
  const todoTopic = useTodoStore((state) => state.todoTopics);

  return (
    <div className="justify-center flex items-center size-full font-semibold text-xl w-full p-4">
      {todoTopic.length !== 0 ? (
        <span>Select a Topic</span>
      ) : (
        <div className="min-w-[200px] flex flex-col space-y-4">
          <span className="text-lg">No Topic! Create a new one</span>
          <NewTopicModal />
        </div>
      )}
    </div>
  );
}
