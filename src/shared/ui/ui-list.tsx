import clsx from "clsx";
import { ReactNode } from "react";

export type UiListProps = {
    className?: string;
    children?: ReactNode;
};

export function UiList({className, children} : UiListProps) {
    return (
        <div className={clsx(className, "w-[388px] h-[448px] gap-3 bg-[#F3F3F3] flex flex-col items-center pt-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]")}>
            {children}
        </div>
    );
}


