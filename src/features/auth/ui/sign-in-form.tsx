import { UiLink } from "@/shared/ui/ui-link";
import { useSignInForm } from "../model/use-sign-in-form";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { ROUTES } from "@/shared/constants/routes";

export function SignInForm() {
  const { register, handleSubmit, errorMessage, isPending } = useSignInForm();

  return (
    <form className="flex flex-col justify-between mt-14 flex-1" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-5 mb-8">
        <div className="w-full ml-9 text-[20px] font-medium text-[#4B4242]">
          Авторизация
        </div>
        <UiTextField
          inputProps={{ ...register("email", { required: true }) }}
          placeholder="Email"
        />
        <UiTextField
          inputProps={{
            type: "password",
            ...register("password", { required: true }),
          }}
          placeholder="Пароль"
        />
        {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
        {/* <UiLink href={ROUTES.SIGN_IN}>Забыли пароль?</UiLink> */}
      </div>
      <div className="flex flex-col justify-center my-10 items-center">
        <UiButton disabled={isPending}>{isPending ? <UiSpinner/> : "Начать"}</UiButton>
        <div className="text-[20px] text-white mt-8">
          Нет аккаунта? <UiLink href={ROUTES.SIGN_UP}>Зарегистрируйтесь</UiLink>
        </div>
      </div>
    </form>
  );
}
