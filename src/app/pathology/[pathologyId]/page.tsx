import {Pathology} from "@/features/atlas";
import {Metadata} from "next";
import {isAdmin} from "@/shared/lib/auth";

export const metadata: Metadata = {
    title: "Паталогия",
};

export default async function PathologyDetailPage() {
    const adminMode = await isAdmin();

    return (
        <div className="flex flex-col w-full">
            {/* Отображение выбранной паталогии */}
            <Pathology isAdmin={adminMode}/>
        </div>
    );
}
