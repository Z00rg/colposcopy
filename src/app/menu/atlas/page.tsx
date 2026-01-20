import {AtlasList} from "@/features/atlas";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {isAdmin} from "@/shared/lib/auth";

export const metadata: Metadata = {
    title: "Атлас",
};

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