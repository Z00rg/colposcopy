import { TestList } from "@/features/test";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";

export function ChoiceTestPage() {
  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-16" />
      <div className="flex flex-col justify-between items-center gap-5 flex-1 mb-4">
        <div className="px-5">
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Настройки тестирования
          </div>
          <TestList />
        </div>
        <UiFooter activeStatus="test" />
      </div>
    </div>
  );
}
