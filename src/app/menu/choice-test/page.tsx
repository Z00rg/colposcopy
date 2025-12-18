import { TestList } from "@/features/test";
import { Metadata } from "next";
import {UiFooter} from "@/shared/ui/ui-footer";

export const metadata: Metadata = {
  title: "Настройки тестирования",
};

export default function ChoiceTestPage() {
  return (
      <>
      <div className="font-medium text-[20px] mt-7">
        Настройки тестирования
      </div>
      <TestList />
      <UiFooter activeStatus="test" />
      </>
  );
}