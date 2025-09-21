import { UiTextArea } from "@/shared/ui/ui-textarea";

export default function HomePage() {
  return (
    <div
      className={`flex justify-center items-center min-h-screen flex-col gap-10`}
    >
      <UiTextArea>
        Тут будет главное меню
      </UiTextArea>
    </div>
  );
}
