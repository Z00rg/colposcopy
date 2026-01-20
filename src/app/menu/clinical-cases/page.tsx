import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {cookies} from "next/dist/server/request/cookies";

export const metadata: Metadata = {
    title: "Клинические случаи",
};

export default async function ClinicalCasesPage() {
    // Куки до рендера на сервере
    const cookieStore = await cookies();
    const userRole = cookieStore.get("user_role")?.value;

    // Проверка роли
    const isAdmin = userRole === "admin";

    return (
        <>
            <div className="font-medium text-[20px] mt-7">
                Клинические случаи
            </div>

            {/* Список патологий + клинических кейсов */}
            <ClinicalCasesList adminList={isAdmin}/>

            {/* Футер */}
            <UiFooter activeStatus="clinic"/>
        </>
    );
}
