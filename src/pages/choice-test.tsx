import { TestList } from "@/features/test";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";

export function ChoiceTestPage() {
  return (
    <UiPageLayout
      title="Настройки тестирования"
      activeStatus="test"
      headerText="Настройки тестирования"
    >
      <TestList />
    </UiPageLayout>
  );
}