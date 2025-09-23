import { UiTextArea } from "@/shared/ui/ui-textarea";

export function PassingTestPage() {
  return (
        <div
          className={`flex justify-center items-center min-h-screen flex-col gap-10 text-5xl`}
        >
          <UiTextArea>
            Тут будет страничка со сдачей теста
          </UiTextArea>
        </div>
      );
}