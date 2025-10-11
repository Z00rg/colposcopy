import clsx from "clsx";
import { UiFooterButton } from "./ui-footer-button";

type UiFooterActiveStatus = "atlas" | "main" | "test";
export type UiFooterProps = {
  activeStatus: UiFooterActiveStatus;
  className?: string;
};

export function UiFooter({activeStatus, className}: UiFooterProps) {
  return (
    <footer className={clsx(className, "flex justify-center items-center px-5 py-1.5 w-[285px] bg-[#F3F3F3] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px] gap-10 mt-auto")}>
      <UiFooterButton variant="book" active={activeStatus === "atlas"}/>
      <UiFooterButton variant="man" active={activeStatus === "main"}/>
      <UiFooterButton variant="check" active={activeStatus === "test"}/>
    </footer>
  );
}