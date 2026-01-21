import {TestTasks} from "@/features/test";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Тестирование",
    description: "Тестовые задания по выбранной тематике патологии",
};

export default function PassingTestPage() {

    return (
        <div className="flex flex-col w-full">
            {/* Отображения тестирования по выбранным темам */}
            <TestTasks/>
        </div>
    );
}
