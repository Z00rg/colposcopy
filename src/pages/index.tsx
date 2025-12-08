import { Profile } from "@/features/account";
import { TryList } from "@/features/try";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export default function HomePage() {

  return (
    <div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Профиль</title>
      </Head>
      <UiHeader variant="withoutLogo" />
      <div className="flex flex-col justify-between w-full gap-5 flex-1 mb-4 px-5">
        <div>
          <div className="font-medium text-[20px] font-[#4B4242] mt-7 mb-4">
            Основной аккаунт
          </div>
          <Profile className="mt-4" />
          <TryList />
        </div>
        <UiFooter activeStatus="main" />
      </div>
    </div>
  );
}
