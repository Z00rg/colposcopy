import { SignUpForm } from "@/features/auth";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function SignUpPage() {

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <Head>
        <title>Регистрация</title>
      </Head>
      <UiHeader variant="withoutLogo" />
      <SignUpForm />
    </div>
  );
}
