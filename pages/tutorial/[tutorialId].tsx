import { TutorialPage } from "@/pages/tutorial";
import { protectedPage } from "@/features/auth";

export default protectedPage(TutorialPage);