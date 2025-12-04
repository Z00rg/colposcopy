import clsx from "clsx";
import { UiSpinner } from "./ui-spinner";

export function UiPageSpinner({ className, message }: { className?: string, message?: string }) {
  return (
    <div
      className={clsx(
        "fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center flex-col bg-slate-100",
        className
      )}
    >
      <UiSpinner className="w-24 h-24" />
      <p className="text-4xl">{message}</p>
    </div>
  );
}
