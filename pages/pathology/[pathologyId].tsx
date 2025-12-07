import { PathologyDetailPage } from "@/pages/pathology";
import { protectedPage } from "@/features/auth";

export default protectedPage(PathologyDetailPage);