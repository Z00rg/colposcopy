import { AtlasList } from "@/features/atlas";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";

export function AtlasPage() {
  return (
    <UiPageLayout
      title="Атлас"
      activeStatus="atlas"
      headerText="Содержание"
    >
      <AtlasList />
    </UiPageLayout>
  );
}