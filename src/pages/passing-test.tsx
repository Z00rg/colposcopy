import { UiFooter } from "@/shared/ui/ui-footer";
import { UiScrollImg } from "@/shared/ui/ui-scroll-img";
import { UiTextArea } from "@/shared/ui/ui-textarea";
import { useEffect, useMemo, useState } from "react";
import { UiProgressBar } from "@/shared/ui/ui-progress-bar";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ROUTES } from "@/shared/constants/routes";
import { UiCheckBox } from "@/shared/ui/ui-checkbox";
import { UiSpinner } from "@/shared/ui/ui-spinner";
import { TestTasks } from "@/features/test";

export function PassingTestPage() {

  return (
    <div className="flex flex-col items-center min-h-screen lg:min-h-[667px]">
      <TestTasks/>
    </div>
  );
}
