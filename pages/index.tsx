import { protectedPage } from "@/features/auth";
import HomePage from "@/pages";

// export default HomePage
export default protectedPage(HomePage)