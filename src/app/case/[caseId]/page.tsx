import {Case} from "@/features/clinical-case/ui/case";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Клинический кейс",
    description: "Подробный описание клинического случая с визуальными примерами",
};

export default function CasePage() {
    return (
        <div className="flex flex-col w-full">
            {/* Отображение клинического случая */}
            <Case/>
        </div>
    );
}
