"use client";

import clsx from "clsx";
import { useSignUpForm } from "../model/use-sign-up-form";
import { UiWhiteTextField } from "@/shared/ui/ui-white-text-field";
import { UiList } from "@/shared/ui/ui-list";
import { UiButton } from "@/shared/ui/ui-button";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { UiLink } from "@/shared/ui/ui-link";
import { ROUTES } from "@/shared/constants/routes";

export function SignUpForm() {
  const {
    register,
    errorMessage,
    handleSubmit,
    isPending,
    currentStageIndex,
    handleStageChange,
    isAllFieldsFilled,
  } = useSignUpForm();

  return (
    <form
      className="flex flex-col justify-between mt-[3svh] h-[60svh]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
          Регистрация
        </div>
        <UiList className="items-start min-h-[310px] max-h-[320px]">
          <div className="flex justify-between w-full">
            <div className="font-semibold text-[18px] text-[#4B4242]">
              {currentStageIndex === 1 && "Личные данные"}
              {currentStageIndex === 2 && "Профессиональные данные"}
              {currentStageIndex === 3 && "Данные для входа"}
            </div>
            <div className="font-bold text-[18px]">{currentStageIndex}/3</div>
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 1,
            })}
          >
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваша фамилия"
              inputProps={{ ...register("surname", { required: true }) }}
            />
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваше имя"
              inputProps={{ ...register("name", { required: true }) }}
            />
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваше отчество"
              inputProps={{ ...register("patronymic", { required: true }) }}
            />
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 2,
            })}
          >
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваше место работы/учебы"
              inputProps={{ ...register("work", { required: true }) }}
            />
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваша должность"
              inputProps={{ ...register("position", { required: true }) }}
            />
          </div>
          <div
            className={clsx("flex flex-col gap-2 mb-2", {
              hidden: currentStageIndex !== 3,
            })}
          >
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваш Email"
              inputProps={{
                ...register("email", { required: true }),
                type: "email",
              }}
            />
            <UiWhiteTextField
              className="w-[323px]"
              label="Ваш пароль"
              inputProps={{
                type: "password",
                ...register("password", { required: true }),
              }}
            />
            <UiWhiteTextField
              className="w-[323px]"
              label="Подтвердите пароль"
              inputProps={{
                type: "password",
                ...register("password2", { required: true }),
              }}
            />
          </div>
          <div className="mt-auto flex flex-col w-full gap-2">
            <div className="bg-[#A8A8A8] h-[1px] flex w-full"></div>
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
                disabled={currentStageIndex === 3}
              >
                Далее
              </button>
            </div>
          </div>
        </UiList>
      </div>
      <div className="flex flex-col justify-center items-center mt-[3svh]">
        {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
        <UiButton
          className={clsx({
            "bg-[#BAC0C6] hover:bg-[#BAC0C6]": !isAllFieldsFilled,
          })}
          disabled={!isAllFieldsFilled || isPending}
        >
          {isPending ? <UiSpinner /> : "Регистрация"}
        </UiButton>
        <div className="text-[20px] text-white mt-8">
          Есть аккаунт? <UiLink href={ROUTES.SIGN_IN}>Авторизируйтесь</UiLink>
        </div>
      </div>
    </form>
  );
}
