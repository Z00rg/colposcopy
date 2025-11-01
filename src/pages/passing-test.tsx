import { TestTasks } from "@/features/test";

export function PassingTestPage() {

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <TestTasks/>
    </div>
  );
}
