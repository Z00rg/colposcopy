"use client";

import clsx from "clsx";
import { useState } from "react";
import {useSignUpForm} from "../model/use-sign-up-form";
import {UiWhiteTextField} from "@/shared/ui/ui-white-text-field";
import {UiButton} from "@/shared/ui/ui-button";
import {UiSpinner} from "@/shared/ui/ui-spinner";
import {UiLink} from "@/shared/ui/ui-link";
import {ROUTES} from "@/shared/constants/routes";

export function SignUpForm() {
    const {
        register,
        errorMessage,
        errors,
        handleSubmit,
        isPending,
        currentStageIndex,
        handleStageChange,
        isAllFieldsFilled,
    } = useSignUpForm();

    const [isAgreementChecked, setIsAgreementChecked] = useState(false);

    return (
        <form
            className="flex flex-col w-full max-w-md mx-auto px-5 py-6 gap-6"
            onSubmit={handleSubmit}
        >
            {/* Заголовок и индикатор этапа */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-800">Регистрация</h1>
                <div className="flex items-center justify-between">
          <span className="text-base font-medium text-gray-700">
            {currentStageIndex === 1 && "Личные данные"}
              {currentStageIndex === 2 && "Профессиональные данные"}
              {currentStageIndex === 3 && "Данные для входа"}
          </span>
                    <span className="text-sm font-semibold text-gray-500">
            Шаг {currentStageIndex}/3
          </span>
                </div>

                {/* Прогресс-бар */}
                <div className="flex gap-2 mt-2">
                    {[1, 2, 3].map((step) => (
                        <div
                            key={step}
                            className={clsx(
                                "h-1 flex-1 rounded-full transition-colors duration-300",
                                step <= currentStageIndex ? "bg-[#2E76AA]" : "bg-gray-300"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Поля формы */}
            <div className="flex flex-col gap-4 ">
                {/* Этап 1: Личные данные */}
                <div
                    className={clsx("flex flex-col gap-3", {
                        hidden: currentStageIndex !== 1,
                    })}
                >
                    <UiWhiteTextField
                        label="Фамилия"
                        placeholder="Введите фамилию"
                        inputProps={{...register("surname")}}
                    />
                    <UiWhiteTextField
                        label="Имя"
                        placeholder="Введите имя"
                        inputProps={{...register("name")}}
                    />
                    <UiWhiteTextField
                        label="Отчество"
                        placeholder="Введите отчество"
                        inputProps={{...register("patronymic")}}
                    />
                </div>

                {/* Этап 2: Профессиональные данные */}
                <div
                    className={clsx("flex flex-col gap-3", {
                        hidden: currentStageIndex !== 2,
                    })}
                >
                    <UiWhiteTextField
                        label="Место работы/учебы"
                        placeholder="Например, СОКБ"
                        inputProps={{...register("work")}}
                    />
                    <UiWhiteTextField
                        label="Должность"
                        placeholder="Например, врач-гинеколог"
                        inputProps={{...register("position")}}
                    />
                </div>

                {/* Этап 3: Данные для входа */}
                <div
                    className={clsx("flex flex-col gap-3", {
                        hidden: currentStageIndex !== 3,
                    })}
                >
                    <UiWhiteTextField
                        label="Email"
                        placeholder="example@mail.ru"
                        inputProps={{
                            ...register("email"),
                            type: "email",
                        }}
                        error={errors.email?.message}
                    />
                    <UiWhiteTextField
                        label="Пароль"
                        placeholder="Минимум 6 символов"
                        inputProps={{
                            type: "password",
                            ...register("password"),
                        }}
                        error={errors.password?.message}
                    />
                    <UiWhiteTextField
                        label="Подтвердите пароль"
                        placeholder="Повторите пароль"
                        inputProps={{
                            type: "password",
                            ...register("password2"),
                        }}
                        error={errors.password2?.message}
                    />
                </div>
            </div>

            {/* Навигация между этапами */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                    type="button"
                    className={clsx(
                        "text-[#2E76AA] hover:text-[#26628A] text-lg font-medium transition-colors cursor-pointer",
                        currentStageIndex === 1 && "invisible"
                    )}
                    onClick={() => handleStageChange(currentStageIndex - 1)}
                    disabled={currentStageIndex === 1}
                >
                    ← Назад
                </button>

                <button
                    type="button"
                    className={clsx(
                        "text-[#2E76AA] hover:text-[#26628A] text-lg font-medium transition-colors cursor-pointer",
                        currentStageIndex === 3 && "invisible"
                    )}
                    onClick={() => handleStageChange(currentStageIndex + 1)}
                    disabled={currentStageIndex === 3}
                >
                    Далее →
                </button>
            </div>

            {/* Сообщение об ошибке */}
            {errorMessage && (
                <div
                    className="flex items-center gap-2 p-3 bg-red-50 border-l-4 border-red-500 rounded text-sm text-red-600">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"/>
                    </svg>
                    {errorMessage}
                </div>
            )}

            {/* Чекбокс согласия с лицензионным договором */}
            <label className="flex  gap-3 cursor-pointer group">
                <div className="relative shrink-0">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={isAgreementChecked}
                        onChange={(e) => setIsAgreementChecked(e.target.checked)}
                    />
                    <div className={clsx(
                        "w-5 h-5 rounded border-2 transition-colors duration-150 flex items-center justify-center",
                        isAgreementChecked
                            ? "bg-[#2E76AA] border-[#2E76AA]"
                            : "border-gray-300 bg-white group-hover:border-[#2E76AA]"
                    )}>
                        {isAgreementChecked && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none">
                                <path
                                    d="M1 5L4.5 8.5L11 1.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </div>
                </div>
                <span className="text-sm text-gray-600 leading-snug">
                    Я принимаю условия{" "}
                    <a
                        href="/agreement.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2E76AA] hover:text-[#26628A] underline underline-offset-2 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        лицензионного договора
                    </a>
                </span>
            </label>

            {/* Кнопка регистрации */}
            <UiButton
                className={clsx(
                    "w-full",
                    (!isAllFieldsFilled || !isAgreementChecked) && "opacity-50 cursor-not-allowed"
                )}
                disabled={!isAllFieldsFilled || !isAgreementChecked || isPending}
            >
                {isPending ? <UiSpinner/> : "Регистрация"}
            </UiButton>

            {/* Ссылка на авторизацию */}
            <div className="text-center text-base text-gray-600">
                Уже есть аккаунт?{" "}
                <UiLink href={ROUTES.SIGN_IN} className="text-[#2E76AA] hover:text-[#26628A] font-medium">
                    Войти
                </UiLink>
            </div>
        </form>
    );
}