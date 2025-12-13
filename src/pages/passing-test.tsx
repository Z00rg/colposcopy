import { TestTasks } from "@/features/test";
import Head from "next/head";

export function PassingTestPage() {

  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Тестирование</title>
      </Head>
      <TestTasks/>
    </div>
  );
}
