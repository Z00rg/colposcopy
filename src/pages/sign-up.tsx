import { SignUpForm } from "@/features/auth";
import { UiButton } from "@/shared/ui/ui-button";
import { UiHeader } from "@/shared/ui/ui-header";
import { UiLink } from "@/shared/ui/ui-link";
import { UiList } from "@/shared/ui/ui-list";
import { UiWhiteTextField } from "@/shared/ui/ui-white-text-field";
import clsx from "clsx";
import { useState } from "react";

export function SignUpPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:min-h-[667px]">
      <UiHeader variant="logo" className="mt-16" />
      <SignUpForm/>
    </div>
  );
}
