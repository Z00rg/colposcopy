import {AtlasList} from "@/features/atlas";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";

export const metadata: Metadata = {
    title: "Атлас",
};

export default function AtlasPage() {
    return (
        <>
            <div className="font-medium text-[20px] mt-7">
                Содержание
            </div>

            {/* Список патологий */}
            <AtlasList/>

            {/* Футер */}
            <UiFooter activeStatus="atlas"/>
        </>
    );
}