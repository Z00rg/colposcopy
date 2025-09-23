import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";

export function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="logo" className="mt-16" />
      <form className="flex flex-col justify-between mt-14 flex-1">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
            Авторизация
          </div>
          <UiTextField placeholder="Email" />
          <UiTextField inputProps={{ type: "password" }} placeholder="Пароль" />
          <UiLink href={"/"}>Забыли пароль?</UiLink>
        </div>
        <div className="flex flex-col justify-center my-10 items-center">
          <UiButton>Начать</UiButton>
          <div className="text-[20px] text-white mt-8">
            Нет аккаунта? <UiLink href={"/"}>Зарегистрируйтесь</UiLink>
          </div>
        </div>
      </form>
    </div>
  );
}