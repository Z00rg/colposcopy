import { Pathology } from "@/features/atlas";
// import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function PathologyDetailPage() {
  return (
    <div className="flex flex-col w-full">
      <Head>
        <title>Паталогия</title>
      </Head>
      <Pathology />
    </div>
  );
}
