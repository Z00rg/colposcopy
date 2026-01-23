import {Case} from "@/features/clinical-case/ui/case";
import {Metadata} from "next";
import {isAdmin} from "@/shared/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
    const admin = await isAdmin();

    return {
        title: admin ? "Клинический кейс (режим администратора)" : "Клинический кейс",
        description: "Подробное описание клинического случая с визуальными примерами",
    };
}

export default async function CasePage() {
    const adminMode = await isAdmin();

    return (
        <div className="flex flex-col w-full">
            {/* Отображение клинического случая */}
            <Case isAdmin={adminMode}/>
        </div>
    );
}
