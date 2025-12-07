import { Case } from "@/features/clinical-case/ui/case";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function CasePage() {
  return (
    <div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Клинический кейс</title>
      </Head>
      <UiHeader
        variant="withoutLogo"
        className="mt-6 [@media(max-height:930px)]:hidden"
      />
      <Case />
    </div>
  );
}
