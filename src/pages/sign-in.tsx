import { SignInForm } from "@/features/auth";
import { UiHeader } from "@/shared/ui/ui-header";
import Head from "next/head";

export function SignInPage() {
  return (
    <div className="flex flex-col items-center min-h-svh">
      <Head>
        <title>Авторизация</title>
      </Head>
      <UiHeader variant="logo" />
      <SignInForm />
    </div>
  );
}