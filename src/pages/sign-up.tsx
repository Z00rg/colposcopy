import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiTextField } from "@/shared/ui/ui-text-field";

export function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="logo" className="mt-16" />
      <form className="flex flex-col justify-between mt-14 flex-1">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
            Регистрация
          </div>
          <div className="overflow-y-auto overflow-x-hidden max-h-[285px] bg-transparent w-[360px] flex flex-col items-center gap-5">
            <UiTextField placeholder="Фамилия" />
            <UiTextField placeholder="Имя" />
            <UiTextField placeholder="Отчество" />
            <div className="w-full mt-5 border-t-[1px] border-[#A8A8A8]"></div>
            <UiTextField placeholder="Курс" />
            <UiTextField placeholder="Группа" />
            <div className="w-full mt-5 border-t-[1px] border-[#A8A8A8]"></div>
            <UiTextField placeholder="Email" />
            <UiTextField className="mb-15" placeholder="Пароль" />
          </div>
        </div>
        <div className="flex flex-col justify-center my-10 items-center">
          <UiButton>Начать</UiButton>
          <div className="text-[20px] text-white mt-8">
            <UiLink href={"/"}>Нужна помощь?</UiLink>
          </div>
        </div>
      </form>
    </div>
  );
}
