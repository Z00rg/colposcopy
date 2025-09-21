import clsx from "clsx";

export type UiTextAreaProps = {
    className?: string;
    children?: string;
};

export function UiTextArea({className, children} : UiTextAreaProps) {
    return (
        <div className={clsx(className, "min-w-[300px] max-w-[388px] h-[448px] text-[13px] font-normal bg-[#F3F3F3] flex flex-col items-center pt-3 px-[17px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]",
            "overflow-y-auto overflow-x-hidden"
        )}>
            {children}
        </div>
    );
}


