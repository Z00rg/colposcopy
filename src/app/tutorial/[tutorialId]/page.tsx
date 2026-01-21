import { Tutorial } from "@/features/tutorial";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Обучение",
    description: "Подробное описание темы урока",
};

export default function TutorialPage() {
    return (<div className="flex flex-col w-full">
        {/* Отображение выбранного урока */}
        <Tutorial/>
    </div>)
}