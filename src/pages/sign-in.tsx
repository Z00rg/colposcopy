import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";

export function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <UiHeader variant="logo" className="mt-16" />
      <form className="flex flex-col justify-center mt-20 flex-1">
        <div className="flex flex-col justify-center items-center gap-5">
          <UiTextField placeholder="Email" />
          <UiTextField placeholder="Пароль" />
          <UiLink href={"/"}>Забыли пароль?</UiLink>
        </div>
        <div className="flex flex-col justify-center mt-auto mb-10 items-center">
          <UiButton>Начать</UiButton>
          <div className="text-[20px] text-white mt-8">
            Нет аккаунта? <UiLink href={"/"}>Зарегистрируйся</UiLink>
          </div>
        </div>
      </form>
    </div>
  );
}
