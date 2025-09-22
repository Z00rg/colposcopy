import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";

export function SignInPage() {
  return (
    <div className="flex items-center min-h-screen flex-col">
      <UiHeader variant="logo" className="mt-24" />
      <form className="flex flex-col justify-center mt-20">
        <div className="flex flex-col justify-center items-center gap-5">
          <UiTextField placeholder="Email" />
          <UiTextField placeholder="Пароль" />
          <UiLink href={"/"}>Забыли пароль?</UiLink>
        </div>
        <div className="flex flex-col justify-center">
          <UiButton>Начать</UiButton>
          <div className="text-[20px] text-white mt-8">
            Нет аккаунта? <UiLink href={"/"}>Зарегистрируйся</UiLink>
          </div>
        </div>
      </form>
    </div>
  );
}
