import { AtlasList } from "@/features/atlas";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function AtlasPage() {

  return (
    <div className="flex flex-col w-full min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Атлас</title>
      </Head>
      <UiHeader variant="withoutLogo" className="mt-16" />
      <div className="flex flex-col justify-between w-full gap-5 flex-1 mb-4">
        <div className="px-5">
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Содержание атласа
          </div>
          <AtlasList/>
        </div>
        <UiFooter activeStatus="atlas" />
      </div>
    </div>
  );
}
