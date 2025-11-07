import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiList } from "@/shared/ui/ui-list";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiWhiteTextField } from "@/shared/ui/ui-white-text-field";

export function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="logo" className="mt-16" />
      <form className="flex flex-col justify-between mt-14 flex-1">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
            Регистрация
          </div>
          <UiList className="items-start">
            <div className="flex justify-between w-full">
              <div className="font-semibold text-[18px] text-[#4B4242]">
                Личные данные
              </div>
              <div className="font-bold text-[18px]">counter</div>
            </div>
            <div className="flex flex-col gap-2">
              <UiWhiteTextField label="Ваша фамилия"/>
              <UiWhiteTextField label="Ваше имя"/>
              <UiWhiteTextField label="Ваше отчество"/>
            </div>
            <div className="bg-[#A8A8A8] h-[1px] flex w-full"></div>
          </UiList>
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
