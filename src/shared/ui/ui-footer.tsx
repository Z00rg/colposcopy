import clsx from "clsx";
import { UiFooterButton } from "./ui-footer-button";

type UiFooterActiveStatus = "atlas" | "main" | "test" | "clinic";
export type UiFooterProps = {
  activeStatus: UiFooterActiveStatus;
  className?: string;
};

export function UiFooter({activeStatus, className}: UiFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[12vh] z-10 lg:static lg:h-auto lg:w-auto">
      <footer
        className={clsx(
          className,
          "flex mx-auto justify-center items-center px-5 py-1.5 w-[324px] bg-[#F3F3F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] gap-8 mt-auto"
        )}
      >
        <UiFooterButton variant="book" active={activeStatus === "atlas"} />
        <UiFooterButton variant="clinic" active={activeStatus === "clinic"} />
        <UiFooterButton variant="check" active={activeStatus === "test"} />
        <UiFooterButton variant="man" active={activeStatus === "main"} />
      </footer>
    </div>
  );
}