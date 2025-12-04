import { protectedPage } from "@/features/auth";
import { ClinicalCasesPage } from "@/pages/clinical-cases";

export default protectedPage(ClinicalCasesPage);