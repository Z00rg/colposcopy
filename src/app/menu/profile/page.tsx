import { Profile } from "@/features/account";
import { TryList } from "@/features/try";
import { Metadata } from "next";
import {UiFooter} from "@/shared/ui/ui-footer";

export const metadata: Metadata = {
    title: "Профиль",
};

export default function HomePage() {
  return (
      <>
          <div className="font-medium text-[20px] mt-7">
              Основной аккаунт
          </div>
        <Profile className="mt-4" />
        <TryList />
          <UiFooter activeStatus="main" />
      </>
  );
}