import { ViewingTry } from "@/features/try";
import Head from "next/head";

export function TryDetailPage() {
  return (
    <div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Просмотр попытки</title>
      </Head>
      <ViewingTry />
    </div>
  );
}
