import {AtlasList} from "@/features/atlas";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {cookies} from "next/dist/server/request/cookies";

export const metadata: Metadata = {
    title: "Атлас",
};

export default async function AtlasPage() {
    // Куки до рендера на сервере
    const cookieStore = await cookies();
    const userRole = cookieStore.get("user_role")?.value;

    // Проверка роли
    const isAdmin = userRole === "admin";

    return (
        <>
            <div className="font-medium text-[20px] mt-7">
                Содержание
            </div>

            {/* Список патологий */}
            <AtlasList adminList={isAdmin}/>

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </>
    );
}