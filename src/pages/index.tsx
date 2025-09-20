import { UiButton } from "@/shared/ui/ui-button";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiFooterButton } from "@/shared/ui/ui-footer-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
// import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiTextField } from "@/shared/ui/ui-text-field";

export default function HomePage() {
  return (
      <div className={`flex justify-center items-center min-h-screen flex-col gap-10`}>
        <UiHeader variant="logo"/>
        <UiButton>Начать</UiButton>
        <UiSpinner/>
        <UiLink href={"/"}>Ссылка</UiLink>
        {/* <UiPageSpinner/> */}
        <UiTextField placeholder="Email"/>
        <UiFooterButton variant="book" active></UiFooterButton>
        <UiFooterButton variant="man">as</UiFooterButton>
        <UiFooterButton variant="check">as</UiFooterButton>
        <UiFooter activeStatus="atlas"/>
        <UiFooter activeStatus="main"/>
        <UiFooter activeStatus="test"/>
      </div>
  );
}
