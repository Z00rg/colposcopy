import { ClinicalCasesList } from "@/features/clinical-case/ui/clinical-cases-list";
import { Metadata } from "next";
import {UiFooter} from "@/shared/ui/ui-footer";

export const metadata: Metadata = {
  title: "Клинические случаи",
};

export default function ClinicalCasesPage() {
  return (
      <>
      <div className="font-medium text-[20px] mt-7">
        Клинические случаи
      </div>
      <ClinicalCasesList />
      <UiFooter activeStatus="clinic" />
      </>
  );
}
