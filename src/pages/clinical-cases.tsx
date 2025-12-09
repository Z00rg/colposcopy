import { ClinicalCasesList } from "@/features/clinical-case/ui/clinical-cases-list";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";

export function ClinicalCasesPage() {
  return (
    <UiPageLayout
      title="Клинические случаи"
      activeStatus="clinic"
      headerText="Клинические случаи"
    >
      <ClinicalCasesList />
    </UiPageLayout>
  );
}
