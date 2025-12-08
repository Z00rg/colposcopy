import clsx from "clsx";
import { UiFooterButton } from "./ui-footer-button";

type UiFooterActiveStatus = "atlas" | "main" | "test" | "clinic";
export type UiFooterProps = {
  activeStatus: UiFooterActiveStatus;
  className?: string;
};

export function UiFooter({activeStatus, className}: UiFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[9vh] z-10 lg:static lg:h-auto lg:w-auto backdrop-blur-md">
      <footer
        className={clsx(
          className,
          "flex mx-auto my-auto justify-center items-center px-5 py-1.5 w-full h-full backdrop-blur-md gap-8"
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