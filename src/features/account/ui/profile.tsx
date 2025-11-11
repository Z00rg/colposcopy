import clsx from "clsx";
import { useProfile } from "../model/use-profile";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { useState } from "react";
import { UiWhiteTextField } from "@/shared/ui/ui-white-text-field";

export function Profile({ className }: { className?: string }) {
  const { info, isLoading, isError } = useProfile();
  const [active, setActive] = useState(false);
  const [editState, setEditState] = useState<boolean[]>([false, false, false]);

  const testInfo = {
    firstName: "Артем",
    surname: "Аюпов",
    middleName: "Дмитриевич",
    work: "СамГМУ",
    position: "Ассистент кафедры медицинской физики, математики и информатики",
    email: "ayupov.artev@mail.ru",
    password: "123456789A+",
  };

  const toggleEdit = (index: number) => {
    setEditState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="flex bg-[#F3F3F3] px-[17px] pb-2.5 flex-col shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]">
      <div
        className={clsx(
          className,
          "gap-4 text-[18px] flex items-center justify-start"
        )}
      >
        <div className="flex justify-center items-center">
          <Man />
        </div>
        <div className="flex flex-col">
          <div className="font-bold flex flex-wrap">
            {testInfo.surname} {testInfo.firstName} {testInfo.middleName}
          </div>
          <div className="font-medium flex flex-wrap">{testInfo.email}</div>
        </div>
        <button className="ml-5 mr-2" onClick={() => setActive(!active)}>
          <ArrowRight
            className={clsx(
              "transition-transform duration-300 ease-in-out",
              active && "rotate-90"
            )}
          />
        </button>
      </div>
      <div
        className={clsx(
          "flex flex-col gap-[9px] text-[18px] text-[#4B4242]",
          "transition-all duration-300 ease-in-out overflow-hidden",
          {
            "max-h-0": !active,
            "max-h-[1000px]": active,
          }
        )}
      >
        <div className="bg-[#A8A8A8] h-[1px] mt-[9px] flex w-full"></div>
        <div className="flex justify-between w-full">
          <div className="font-semibold text-[18px] text-[#4B4242]">
            Личные данные
          </div>
          <div className="flex justify-center items-center">
            {!editState[0] ? (
              <button onClick={() => toggleEdit(0)}>
                <Pencil />
              </button>
            ) : (
              <button
                className="text-[#639EDD] hover:text-[#26628A] text-[18px] font-bold cursor-pointer"
                onClick={() => {
                  console.log("Отправляем POST запрос для личных данных");
                  toggleEdit(0);
                }}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <UiWhiteTextField
            label="Ваша фамилия"
            inputProps={{
              disabled: !editState[0],
              value: testInfo.surname,
              // ...register("surname", { required: true })
            }}
          />
          <UiWhiteTextField
            label="Ваше имя"
            inputProps={{
              disabled: !editState[0],
              value: testInfo.firstName,
              // ...register("firstName", { required: true })
            }}
          />
          <UiWhiteTextField
            label="Ваше отчество"
            inputProps={{
              disabled: !editState[0],
              value: testInfo.middleName,
              // ...register("middleName", { required: true }),
            }}
          />
        </div>
        <div className="bg-[#A8A8A8] h-[1px] mt-[9px] flex w-full"></div>
        <div className="flex justify-between w-full">
          <div className="font-semibold text-[18px] text-[#4B4242]">
            Cлужебные данные
          </div>
          <div className="flex justify-center items-center">
            {!editState[1] ? (
              <button onClick={() => toggleEdit(1)}>
                <Pencil />
              </button>
            ) : (
              <button
                className="text-[#639EDD] hover:text-[#26628A] text-[18px] font-bold cursor-pointer"
                onClick={() => {
                  console.log("Отправляем POST запрос для личных данных");
                  toggleEdit(1);
                }}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <UiWhiteTextField
            label="Ваше место работы/учебы"
            inputProps={{
              disabled: !editState[1],
              value: testInfo.work,
              // ...register("work", { required: true })
            }}
          />
          <UiWhiteTextField
            label="Ваша должность"
            inputProps={{
              disabled: !editState[1],
              value: testInfo.position,
              // ...register("position", { required: true })
            }}
          />
        </div>
        <div className="bg-[#A8A8A8] h-[1px] mt-[9px] flex w-full"></div>
        <div className="flex justify-between w-full">
          <div className="font-semibold text-[18px] text-[#4B4242]">
            Данные для входа
          </div>
          <div className="flex justify-center items-center">
            {!editState[2] ? (
              <button onClick={() => toggleEdit(2)}>
                <Pencil />
              </button>
            ) : (
              <button
                className="text-[#639EDD] hover:text-[#26628A] text-[18px] font-bold cursor-pointer"
                onClick={() => {
                  console.log("Отправляем POST запрос для личных данных");
                  toggleEdit(2);
                }}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <UiWhiteTextField
            label="Ваш Email"
            inputProps={{
              disabled: !editState[2],
              value: testInfo.email,
              // ...register("email", { required: true })
            }}
          />
          <UiWhiteTextField
            label="Ваш пароль"
            inputProps={{
              type: "password",
              disabled: !editState[2],
              value: testInfo.password,
              // ...register("password", { required: true }),
            }}
          />
        </div>
        <div className="bg-[#A8A8A8] h-[1px] mt-[9px] flex w-full"></div>
        <button
          className="ml-auto text-rose-500 hover:text-[#26628A] text-[20px] cursor-pointer"
          onClick={() => console.log("Тут будет выход из аккаунта")}
        >
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}

export const Man = ({ className }: { className?: string }) => (
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
      fill="#A3B3C4"
    />
    <path
      d="M12.7538 17.6157C17.1883 17.6157 20.7822 14.0937 20.7822 9.74994V7.86568C20.7822 3.52195 17.1883 0 12.7538 0C8.31854 0 4.72412 3.52195 4.72412 7.86574V9.75C4.72412 14.0937 8.3186 17.6157 12.7538 17.6157Z"
      fill="#A3B3C4"
    />
  </svg>
);

export const ArrowRight = ({ className }: { className?: string }) => (
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
      fill="black"
    />
  </svg>
);

export const Pencil = ({ className }: { className?: string }) => (
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
      fill="black"
    />
    <path
      d="M10.9204 2.5795L15.4204 7.0795L17.068 5.43198C17.6647 4.83524 17.9999 4.02589 17.9999 3.18198C17.9999 1.42462 16.5753 0 14.818 0C13.974 0 13.1647 0.335244 12.568 0.931981L10.9204 2.5795Z"
      fill="black"
    />
  </svg>
);
