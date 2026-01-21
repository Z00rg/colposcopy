import {AtlasList} from "@/features/atlas";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {isAdmin} from "@/shared/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
    const admin = await isAdmin();

    return {
        title: admin ? "Атлас (режим администратора)" : "Атлас",
        description: "Подборка доступных уроков по кольпоскопии и патологий для изучения",
    };
}


export default async function AtlasPage() {
    const adminMode = await isAdmin();

    return (
        <>
            <div className="font-medium text-[20px] mt-7">
                Содержание
            </div>

            {/* Список патологий */}
            <AtlasList adminList={adminMode}/>

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </>
    );
}