import { protectedPage } from "@/features/auth";
import { AdminHomePage } from "@/src/pages/admin-home";

export default protectedPage(AdminHomePage);