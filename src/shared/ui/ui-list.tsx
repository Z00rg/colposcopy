import clsx from "clsx";

export type UiListProps = {
    className?: string;
    children?: any;
};

export function UiList({className, children} : UiListProps) {
    return (
        <div className={clsx(className, "w-[388px] h-[448px] bg-[#F3F3F3] flex flex-col items-center pt-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]")}>
            {children}
        </div>
    );
}


