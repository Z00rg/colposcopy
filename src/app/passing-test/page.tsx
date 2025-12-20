import { TestTasks } from "@/features/test";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Тестирование",
};

export default function PassingTestPage() {

  return (
    <div className="flex flex-col w-full">
            <TestTasks/>
    </div>
  );
}
