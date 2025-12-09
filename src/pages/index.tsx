import { Profile } from "@/features/account";
import { TryList } from "@/features/try";
import { UiPageLayout } from "@/shared/ui/layouts/ui-page-layout";

export default function HomePage() {
  return (
    <UiPageLayout
      title="Профиль"
      activeStatus="main"
      headerText="Основной аккаунт"
    >
      <Profile className="mt-4" />
      <TryList />
    </UiPageLayout>
  );
}