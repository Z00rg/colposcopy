import { TestTasks } from "@/features/test";
import Head from "next/head";

export function PassingTestPage() {

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Тестирование</title>
      </Head>
      <TestTasks/>
    </div>
  );
}
