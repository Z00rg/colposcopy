import { ReactNode } from "react";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiFooter, UiFooterActiveStatus } from "@/shared/ui/ui-footer";
import clsx from "clsx";

export interface UiPageLayoutProps {
  activeStatus: UiFooterActiveStatus;
  headerText: string;
  children: ReactNode;
  className?: string;
}

export function UiPageLayout({
  activeStatus,
  headerText,
  children,
  className,
}: UiPageLayoutProps) {
  return (
    <div
      className={clsx(
        "flex flex-col w-full",
        className
      )}
    >

      <UiHeader variant="withoutLogo" />

      <div className="flex flex-col w-full flex-1">
        <div className="px-5">
          <div className="font-medium text-[20px] mt-7">
            {headerText}
          </div>
          {children}
        </div>

        <UiFooter activeStatus={activeStatus} />
      </div>
    </div>
  );
}