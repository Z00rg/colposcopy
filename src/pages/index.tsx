import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";

export default function HomePage() {
  return (
      <div className={`flex justify-center items-center min-h-screen flex-col gap-10`}>
        <UiHeader variant="logo"/>
        <UiButton>Начать</UiButton>
      </div>
  );
}
