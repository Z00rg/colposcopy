import { Tutorial } from "@/features/tutorial";
import { Metadata } from "next";
import {isAdmin} from "@/shared/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
    const admin = await isAdmin();

    return {
        title: admin ? "Обучение (режим администратора)" : "Обучение",
        description: "Подробное описание темы урока",
    };
}

export default async function TutorialPage() {
    const adminMode = await isAdmin();

    return (<div className="flex flex-col w-full">
        {/* Отображение выбранного урока */}
        <Tutorial isAdmin={adminMode}/>
    </div>)
}