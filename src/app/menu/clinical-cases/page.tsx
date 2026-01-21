import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {isAdmin} from "@/shared/lib/auth";

export async function generateMetadata(): Promise<Metadata> {
    const admin = await isAdmin();

    return {
        title: admin ? "Клинические случаи (режим администратора)" : "Клинические случаи",
        description: "Подборка доступных клинических случаев по патология для изучения",
    };
}

export default async function ClinicalCasesPage() {
    const adminMode = await isAdmin();

    return (
        <>
            <div className="font-medium text-[20px] mt-7">
                Клинические случаи
            </div>

            {/* Список патологий + клинических кейсов */}
            <ClinicalCasesList adminList={adminMode}/>

            {/* Футер */}
            <UiFooter activeStatus="clinic"/>
        </>
    );
}
