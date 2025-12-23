import clsx from "clsx";
import {ReactNode} from "react";

export type UiListProps = {
    className?: string;
    children?: ReactNode;
    height?: string;
};

export function UiList({className, children, height}: UiListProps) {
    const heightProps = height ? height : "h-[62svh]";
    return (
        <div
            className={clsx(
                "w-full max-w-full gap-3 bg-white border-gray-200 flex flex-col items-center pt-3 pb-3 px-4.25 shadow-md rounded-xl",
                "overflow-y-auto overflow-x-hidden scroll-smooth",
                heightProps,
                className
            )}
        >
            {children}
        </div>
    );
}


