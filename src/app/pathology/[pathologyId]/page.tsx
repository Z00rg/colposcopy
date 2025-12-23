import {Pathology} from "@/features/atlas";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Паталогия",
};

export default function PathologyDetailPage() {
    return (
        <div className="flex flex-col w-full">
            {/* Отображение выбранной паталогии */}
            <Pathology/>
        </div>
    );
}
