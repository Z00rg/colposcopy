import clsx from "clsx";
import { ReactNode } from "react";

export type UiTextAreaProps = {
  className?: string;
  children?: ReactNode;
  textAreaRef?: React.Ref<HTMLDivElement>;
};

export function UiTextArea({
  className,
  children,
  textAreaRef,
}: UiTextAreaProps) {
  return (
    <div
      ref={textAreaRef}
      className={clsx(
        className,
        "min-w-[300px] max-w-[388px] h-[285px] text-[16px] font-normal bg-[#F1F1F1] flex flex-col items-center pt-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]",
        "overflow-y-auto overflow-x-hidden"
      )}
    >
      {children}
    </div>
  );
}


