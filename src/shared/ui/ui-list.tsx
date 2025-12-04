import clsx from "clsx";
import { ReactNode } from "react";

export type UiListProps = {
    className?: string;
    children?: ReactNode;
};

export function UiList({className, children} : UiListProps) {
    return (
        <div className={clsx(className, "min-h-[407px] max-h-[500px] min-w-[335px] lg:min-w-[394px] gap-3 bg-[#F3F3F3] flex flex-col items-center pt-3 pb-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]",
            "overflow-y-auto overflow-x-hidden"
        )}>
            {children}
        </div>
    );
}


