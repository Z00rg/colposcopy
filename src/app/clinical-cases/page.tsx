import { ClinicalCasesList } from "@/features/clinical-case/ui/clinical-cases-list";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Клинические случаи",
};

export default function ClinicalCasesPage() {
  return (
    <UiPageLayout
      activeStatus="clinic"
      headerText="Клинические случаи"
    >
      <ClinicalCasesList />
    </UiPageLayout>
  );
}
