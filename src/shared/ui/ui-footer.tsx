import clsx from "clsx";
import {UiFooterButton} from "./ui-footer-button";

export type UiFooterActiveStatus = "atlas" | "main" | "test" | "clinic";
export type UiFooterProps = {
    activeStatus: UiFooterActiveStatus;
    className?: string;
};

export function UiFooter({activeStatus, className}: UiFooterProps) {
    return (
        <>
            {/* Область, чтобы футер не перекрывал контент */}
            <div className="h-[9svh] w-full"/>

            {/* Футер */}
            <div
                className="fixed bottom-0 left-0 w-full lg:w-[28svw] lg:left-1/2 lg:transform lg:-translate-x-1/2 z-50">
                <footer
                    className={clsx(
                        className,
                        "flex mx-auto justify-around items-center",
                        "h-[9svh] px-4",
                        "bg-white/25 backdrop-blur-md",
                        "border-t border-white/20",
                        "shadow-[0_-2px_16px_rgba(0,0,0,0.06)]"
                    )}
                >
                    {/* Содержание футера */}
                    <UiFooterButton variant="book" active={activeStatus === "atlas"}/>
                    <UiFooterButton variant="clinic" active={activeStatus === "clinic"}/>
                    <UiFooterButton variant="check" active={activeStatus === "test"}/>
                    <UiFooterButton variant="man" active={activeStatus === "main"}/>
                </footer>
            </div>
        </>
    );
}