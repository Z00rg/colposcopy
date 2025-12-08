import clsx from "clsx";
import { ReactNode } from "react";

export type UiListProps = {
  className?: string;
  children?: ReactNode;
  height?: string;
};

export function UiList({ className, children, height }: UiListProps) {
  const heightProps = height ? height : "h-[62svh]";
  return (
    <div
      className={clsx(
        "w-full max-w-full gap-3 bg-[#F3F3F3] flex flex-col items-center pt-3 pb-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]",
        "overflow-y-auto overflow-x-hidden scroll-smooth",
        heightProps,
        className
      )}
    >
      {children}
    </div>
  );
}


