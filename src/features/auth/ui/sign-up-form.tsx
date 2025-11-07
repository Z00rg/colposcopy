import clsx from "clsx";
import { useSignUpForm } from "../model/use-sign-up-form";
import { UiWhiteTextField } from "@/shared/ui/ui-white-text-field";
import { UiList } from "@/shared/ui/ui-list";
import { UiButton } from "@/shared/ui/ui-button";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTES } from "@/shared/constants/routes";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function SignUpForm() {
  const { register, errorMessage, handleSubmit, isPending, currentStageIndex, handleStageChange } = useSignUpForm();

  return (
    <form className="flex flex-col justify-between mt-14 flex-1" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
          Регистрация
        </div>
        <UiList className="items-start min-h-[310px]">
          <div className="flex justify-between w-full">
            <div className="font-semibold text-[18px] text-[#4B4242]">
              Личные данные
            </div>
            <div className="font-bold text-[18px]">{currentStageIndex}/3</div>
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 1,
            })}
          >
            <UiWhiteTextField label="Ваша фамилия" inputProps={{ ...register("surname", { required: true }) }}/>
            <UiWhiteTextField label="Ваше имя" inputProps={{ ...register("firstName", { required: true }) }}/>
            <UiWhiteTextField label="Ваше отчество" inputProps={{ ...register("middleName", { required: true }) }}/>
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 2,
            })}
          >
            <UiWhiteTextField label="Ваше место работы/учебы" inputProps={{ ...register("work", { required: true }) }}/>
            <UiWhiteTextField label="Ваша должность" inputProps={{ ...register("position", { required: true }) }}/>
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 3,
            })}
          >
            <UiWhiteTextField label="Ваш Email" inputProps={{ ...register("email", { required: true }) }}/>
            <UiWhiteTextField label="Ваш пароль" inputProps={{ type: "password", ...register("password", { required: true }) }}/>
          </div>
          <div className="mt-auto flex flex-col w-full gap-2">
            <div className="bg-[#A8A8A8] h-[1px] flex w-full"></div>
            {/* Навигационные кнопки */}
            <div className="flex w-full">
              <button
                type="button"
                className={clsx(
                  { hidden: currentStageIndex === 1 },
                  "mr-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
                )}
                onClick={() => handleStageChange(currentStageIndex - 1)}
                disabled={currentStageIndex === 1}
              >
                Назад
              </button>

              <button
                type="button"
                className={clsx(
                  { hidden: currentStageIndex === 3 },
                  "ml-auto text-[#2E76AA] hover:text-[#26628A] text-[20px] font-normal cursor-pointer"
                )}
                onClick={() => handleStageChange(currentStageIndex + 1)}
                // disabled={currentStageIndex === tasks.length - 1}
              >
                Далее
              </button>
            </div>
          </div>
        </UiList>
      </div>
      <div className="flex flex-col justify-center my-10 items-center">
        {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
        <UiButton disabled={isPending}>{isPending ? <UiSpinner/> : "Регистрация"}</UiButton>
        <div className="text-[20px] text-white mt-8">
          <UiLink href={ROUTES.SIGN_UP}>Нужна помощь?</UiLink>
        </div>
      </div>
    </form>
  );
}
