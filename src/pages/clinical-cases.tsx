import { ClinicalCasesList } from "@/features/clinical-case/ui/clinical-cases-list";
import { UiFooter } from "@/shared/ui/ui-footer";
import { UiHeader } from "@/shared/ui/ui-header";

export function ClinicalCasesPage() {

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="withoutLogo" className="mt-16" />
      <div className="flex flex-col justify-between items-center gap-5 flex-1 mb-4">
        <div className="px-5">
          <div className="font-medium text-[20px] font-[#4B4242] mt-7">
            Клинические случаи
          </div>
          <ClinicalCasesList/>
        </div>
        <UiFooter activeStatus="clinic" />
      </div>
    </div>
  );
}
