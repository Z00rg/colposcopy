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
  const renderChildren = () => {
    if (typeof children === "string") {
      return children
        .split(/\r?\n/)
        .filter((paragraph) => paragraph.trim() !== "")
        .map((paragraph, index) => <p key={index}>{paragraph}</p>);
    }

    // Если children — React-элементы (уже структурированные), просто рендерим как есть
    return children;
  };

  return (
    <div
      ref={textAreaRef}
      className={clsx(
        className,
        "min-w-[328px] lg:min-w-[371px] max-w-[388px] h-[285px] text-[16px] font-normal bg-[#F1F1F1] flex flex-col pt-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]",
        "overflow-y-auto overflow-x-hidden"
      )}
    >
      {renderChildren()}
    </div>
  );
}


