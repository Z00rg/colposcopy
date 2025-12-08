import { ClinicalCasesList } from "@/features/clinical-case/ui/clinical-cases-list";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function ClinicalCasesPage() {

  return (
    <div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Клинические случаи</title>
      </Head>
      <UiHeader variant="withoutLogo" />
      <div className="flex flex-col justify-between w-full gap-5 flex-1 mb-4">
        <div className="px-5">
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Клинические случаи
          </div>
          <ClinicalCasesList />
        </div>
        <UiFooter activeStatus="clinic" />
      </div>
    </div>
  );
}
