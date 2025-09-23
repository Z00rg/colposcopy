import { UiTextArea } from "@/shared/ui/ui-textarea";

export function AdminHomePage() {
  return (
      <div
        className={`flex justify-center items-center min-h-screen flex-col gap-10 text-5xl`}
      >
        <UiTextArea>
          Тут будет админка
        </UiTextArea>
      </div>
    );
}