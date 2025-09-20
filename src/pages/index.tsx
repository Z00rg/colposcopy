import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
// import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export default function HomePage() {
  return (
      <div className={`flex justify-center items-center min-h-screen flex-col gap-10`}>
        <UiHeader variant="logo"/>
        <UiButton>Начать</UiButton>
        <UiSpinner/>
        <UiLink href={"/"}>Ссылка</UiLink>
        {/* <UiPageSpinner/> */}
      </div>
  );
}
