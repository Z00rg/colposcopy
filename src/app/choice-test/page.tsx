import { TestList } from "@/features/test";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Настройки тестирования",
};

export default function ChoiceTestPage() {
  return (
    <UiPageLayout
      activeStatus="test"
      headerText="Настройки тестирования"
    >
      <TestList />
    </UiPageLayout>
  );
}