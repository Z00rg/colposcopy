"use client";

import clsx from "clsx";
import { ReactNode } from "react";
import { useScrollRestoration } from "@/shared/lib/use-scroll-restoration";

export type UiListProps = {
    className?: string;
    children?: ReactNode;
    height?: string;
    scrollKey?: string;
};

// Со scrollKey, для восстановления положения скролла
function UiListInner({
                         className,
                         children,
                         height,
                         scrollKey,
                     }: UiListProps) {
    const heightProps = height ?? "h-[62svh]";
    const scrollRef = useScrollRestoration(scrollKey!);

    return (
        <div
            ref={scrollRef}
            className={clsx(
                "w-full max-w-full gap-3 bg-white border border-gray-200 flex flex-col items-center pt-3 pb-3 px-4.25 shadow-sm rounded-xl",
                "overflow-y-auto overflow-x-hidden scroll-smooth",
                heightProps,
                className
            )}
        >
            {children}
        </div>
    );
}

// Без scrollKey
function UiListPlain({ className, children, height }: UiListProps) {
    const heightProps = height ?? "h-[62svh]";

    return (
        <div
            className={clsx(
                "w-full max-w-full gap-3 bg-white border border-gray-200 flex flex-col items-center pt-3 pb-3 px-4.25 shadow-sm rounded-xl",
                "overflow-y-auto overflow-x-hidden scroll-smooth",
                heightProps,
                className
            )}
        >
            {children}
        </div>
    );
}

export function UiList({ scrollKey, ...props }: UiListProps) {
    if (scrollKey) return <UiListInner {...props} scrollKey={scrollKey} />;
    return <UiListPlain {...props} />;
}