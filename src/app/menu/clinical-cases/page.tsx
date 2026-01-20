import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";
import {Metadata} from "next";
import {UiFooter} from "@/shared/ui/ui-footer";
import {isAdmin} from "@/shared/lib/auth";

export const metadata: Metadata = {
    title: "Клинические случаи",
};

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
