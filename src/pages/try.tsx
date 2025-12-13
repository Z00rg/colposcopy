import { ViewingTry } from "@/features/try";
import Head from "next/head";

export function TryDetailPage() {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Просмотр попытки</title>
      </Head>
      <ViewingTry />
    </div>
  );
}
