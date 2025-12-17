import { AtlasList } from "@/features/atlas";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Атлас",
};

export default function AtlasPage() {
  return (
    <UiPageLayout
      activeStatus="atlas"
      headerText="Содержание"
    >
      <AtlasList />
    </UiPageLayout>
  );
}