import clsx from "clsx";
import { useState } from "react";
import { useInstruction } from "../model/use-instruction";
import { UiSpinner } from "@/shared/ui/ui-spinner";

export function Instruction({ className }: { className?: string }) {
  const [active, setActive] = useState(false);

  const { instructionDetails, isLoading, isError } = useInstruction();

  return (
    <div
      className={clsx(
        className,
        "w-full border-b-1 border-[#BDBDBD] flex flex-col px-[9px]"
      )}
    >
      <div className="h-[30px] flex justify-between font-bold text-[18px] text-[#4B4242] mb-1 gap-26">
        <div className="flex gap-2.5 w-full">Инструкция</div>
        <button onClick={() => setActive(!active)}>
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
          "flex flex-col gap-[9px] text-[18px] my-2 text-[#4B4242]",
          "transition-all duration-300 ease-in-out overflow-hidden",
          {
            "max-h-0": !active,
            "max-h-[500px]": active,
          }
        )}
      >
        {isLoading && <UiSpinner />}
        {isError && (
          <div className="font-bold text-rose-500">
            Ошибка при загрузке инструкции
          </div>
        )}
        {instructionDetails && instructionDetails.text}
      </div>
    </div>
  );
}

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

export const ArrowBottom = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="9"
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM8 6H7V8H8H9V6H8Z"
      fill="black"
    />
  </svg>
);
