// src/shared/ui/layouts/ui-page-layout/ui-page-layout.tsx
import { ReactNode } from "react";
import Head from "next/head";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiFooter, UiFooterActiveStatus } from "@/shared/ui/ui-footer";
import clsx from "clsx";

export interface UiPageLayoutProps {
  title: string;
  activeStatus: UiFooterActiveStatus;
  headerText: string;
  children: ReactNode;
  className?: string;
}

export function UiPageLayout({
  title,
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
      <Head>
        <title>{title}</title>
      </Head>

      <UiHeader variant="withoutLogo" />

      <div className="flex flex-col justify-between w-full gap-5 flex-1 mb-4">
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