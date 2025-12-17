import { Profile } from "@/features/account";
import { TryList } from "@/features/try";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Профиль",
};

export default function HomePage() {
  return (
      <UiPageLayout
          activeStatus="main"
          headerText="Основной аккаунт"
      >
        <Profile className="mt-4" />
        <TryList />
      </UiPageLayout>
  );
}