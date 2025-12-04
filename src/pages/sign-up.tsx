import { SignUpForm } from "@/features/auth";
import { UiHeader } from "@/shared/ui/ui-header";

export function SignUpPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="logo" className="mt-16" />
      <SignUpForm/>
    </div>
  );
}
