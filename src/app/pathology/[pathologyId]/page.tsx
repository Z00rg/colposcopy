import {Pathology} from "@/features/atlas";
import {Metadata} from "next";
import {isAdmin} from "@/shared/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
    const admin = await isAdmin();

    return {
        title: admin ? "Патология (режим администратора)" : "Патология",
        description: "Подробное описание патологии с визуальными примерами",
    };
}

export default async function PathologyDetailPage() {
    const adminMode = await isAdmin();

    return (
        <div className="flex flex-col w-full">
            {/* Отображение выбранной паталогии */}
            <Pathology isAdmin={adminMode}/>
        </div>
    );
}
