import clsx from "clsx";

export function UiPageSpinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center",
        className
      )}
    >
    </div>
  );
}
