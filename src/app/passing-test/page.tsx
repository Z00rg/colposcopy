import { TestTasks } from "@/features/test";
import {Suspense} from "react";
import { Metadata } from "next";
import {UiSpinner} from "@/shared/ui/ui-spinner";

export const metadata: Metadata = {
    title: "Тестирование",
};

export default function PassingTestPage() {

  return (
    <div className="flex flex-col w-full">
        <Suspense fallback={<div className="w-full flex justify-center"><UiSpinner/></div>}>
            <TestTasks/>
        </Suspense>
    </div>
  );
}
