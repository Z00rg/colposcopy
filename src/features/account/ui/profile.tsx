"use client";

import clsx from "clsx";
import {useProfile} from "../model/use-profile";
import {UiWhiteTextField} from "@/shared/ui/ui-white-text-field";
import {SignOutButton} from "@/features/auth";
import {UiError} from "@/shared/ui/ui-error";

export function Profile({className}: { className?: string }) {
    const {
        formData,
        active,
        setActive,
        editState,
        toggleEdit,
        handleChange,
        handleSave,
        isLoading,
        isError,
    } = useProfile();

    return (
        <div
            className={clsx(
                className,
                "flex bg-white border border-gray-200 w-full px-5 py-4 flex-col rounded-xl shadow-sm flex-1 transition-all duration-200 ",
                !active && "hover:shadow-md hover:border-gray-300"
            )}
        >
            {/* Верхняя часть - заголовок профиля */}
            <div
                className={clsx(
                    "flex items-center gap-4 cursor-pointer",
                    active && "border-b border-gray-200 pb-4"
                )}
                onClick={() => setActive(!active)}
            >
                {/* Иконка пользователя */}
                <div
                    className="shrink-0 w-12 h-12 bg-linear-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Man className="w-6 h-6"/>
                </div>

                {/* Информация о пользователе */}
                <div className="flex-1 min-w-0">
                    {isError && (
                        <UiError className="text-sm">
                            Ошибка загрузки данных профиля
                        </UiError>
                    )}
                    {isLoading ? (
                        <div className="flex flex-col gap-2 animate-pulse">
                            <div className="h-5 bg-gray-300 rounded w-40"></div>
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                        </div>
                    ) : (
                        <div className="flex flex-col overflow-hidden">
                            <div className="font-semibold text-gray-800 text-base truncate">
                                {formData.surname} {formData.name} {formData.patronymic}
                            </div>
                            <div className="text-sm text-gray-600 truncate">
                                {formData.email}
                            </div>
                        </div>
                    )}
                </div>

                {/* Кнопка раскрытия */}
                <button
                    className="shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        setActive(!active);
                    }}
                >
                    <ArrowRight
                        className={clsx(
                            "transition-transform duration-300 ease-in-out w-3 h-5",
                            active && "rotate-90"
                        )}
                    />
                </button>
            </div>

            {/* Раскрывающаяся часть */}
            <div
                className={clsx(
                    "flex flex-col gap-4 transition-all duration-300 ease-in-out overflow-hidden",
                    active ? "max-h-500 opacity-100 mt-4" : "max-h-0 opacity-0"
                )}
            >
                <Section
                    title="Личные данные"
                    isEditing={editState[0]}
                    onToggle={() => toggleEdit(0)}
                    onSave={() => handleSave(0)}
                >
                    <UiWhiteTextField
                        label="Фамилия"
                        inputProps={{
                            disabled: !editState[0],
                            value: formData.surname ?? "",
                            onChange: (e) => handleChange("surname", e.target.value),
                        }}
                    />
                    <UiWhiteTextField
                        label="Имя"
                        inputProps={{
                            disabled: !editState[0],
                            value: formData.name ?? "",
                            onChange: (e) => handleChange("name", e.target.value),
                        }}
                    />
                    <UiWhiteTextField
                        label="Отчество"
                        inputProps={{
                            disabled: !editState[0],
                            value: formData.patronymic ?? "",
                            onChange: (e) => handleChange("patronymic", e.target.value),
                        }}
                    />
                </Section>

                <Section
                    title="Профессиональные данные"
                    isEditing={editState[1]}
                    onToggle={() => toggleEdit(1)}
                    onSave={() => handleSave(1)}
                >
                    <UiWhiteTextField
                        label="Место работы/учебы"
                        inputProps={{
                            disabled: !editState[1],
                            value: formData.work ?? "",
                            onChange: (e) => handleChange("work", e.target.value),
                        }}
                    />
                    <UiWhiteTextField
                        label="Должность"
                        inputProps={{
                            disabled: !editState[1],
                            value: formData.position ?? "",
                            onChange: (e) => handleChange("position", e.target.value),
                        }}
                    />
                </Section>

                <Section
                    title="Данные для входа"
                    isEditing={editState[2]}
                    onToggle={() => toggleEdit(2)}
                    onSave={() => handleSave(2)}
                >
                    <UiWhiteTextField
                        label="Email"
                        inputProps={{
                            disabled: !editState[2],
                            value: formData.email ?? "",
                            onChange: (e) => handleChange("email", e.target.value),
                            type: "email",
                        }}
                    />
                    <UiWhiteTextField
                        label="Пароль"
                        inputProps={{
                            type: "password",
                            disabled: !editState[2],
                            value: formData.password ?? "",
                            onChange: (e) => handleChange("password", e.target.value),
                            placeholder: "Оставьте пустым, чтобы не менять",
                        }}
                    />
                </Section>

                <SignOutButton className="ml-auto"/>
            </div>
        </div>
    );
}

const Section = ({
                     title,
                     isEditing,
                     onToggle,
                     onSave,
                     children,
                 }: {
    title: string;
    isEditing: boolean;
    onToggle: () => void;
    onSave: () => void;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-3 pb-4 border-b border-gray-200 last:border-b-0">
        <div className="flex justify-between items-center">
            <h3 className="font-semibold text-base text-gray-800">{title}</h3>
            {!isEditing ? (
                <button
                    onClick={onToggle}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Редактировать"
                >
                    <Pencil className="w-4 h-4"/>
                </button>
            ) : (
                <button
                    className="text-[#2E76AA] hover:text-[#26628A] text-sm font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={onSave}
                >
                    Сохранить
                </button>
            )}
        </div>
        <div className="flex flex-col gap-3">{children}</div>
    </div>
);

export const Man = ({className}: { className?: string }) => (
    <svg
        className={className}
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M24.8446 23.6844C23.7124 21.7128 21.8581 19.4795 18.8392 18.21C17.1126 19.3933 15.015 20.0901 12.7538 20.0901C10.4913 20.0901 8.39373 19.3934 6.66706 18.21C3.6482 19.4795 1.79379 21.7128 0.662235 23.6844C-0.83954 26.2996 0.337885 29.9999 2.93514 29.9999C5.53246 29.9999 12.7538 29.9999 12.7538 29.9999C12.7538 29.9999 19.9745 29.9999 22.5719 29.9999C25.1691 29.9999 26.3465 26.2996 24.8446 23.6844Z"
            fill="white"
        />
        <path
            d="M12.7538 17.6157C17.1883 17.6157 20.7822 14.0937 20.7822 9.74994V7.86568C20.7822 3.52195 17.1883 0 12.7538 0C8.31854 0 4.72412 3.52195 4.72412 7.86574V9.75C4.72412 14.0937 8.3186 17.6157 12.7538 17.6157Z"
            fill="white"
        />
    </svg>
);

export const ArrowRight = ({className}: { className?: string }) => (
    <svg
        className={className}
        width="9"
        height="16"
        viewBox="0 0 9 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 8V9H8V8V7H6V8Z"
            fill="#6B7280"
        />
    </svg>
);

export const Pencil = ({className}: { className?: string }) => (
    <svg
        className={className}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M9.3295 4.1709L1.125 12.3754V16.8754H5.625L13.8295 8.6709L9.3295 4.1709Z"
            fill="#6B7280"
        />
        <path
            d="M10.9204 2.5795L15.4204 7.0795L17.068 5.43198C17.6647 4.83524 17.9999 4.02589 17.9999 3.18198C17.9999 1.42462 16.5753 0 14.818 0C13.974 0 13.1647 0.335244 12.568 0.931981L10.9204 2.5795Z"
            fill="#6B7280"
        />
    </svg>
);