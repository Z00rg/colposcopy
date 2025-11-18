import clsx from "clsx";

export function UiSpinnerSpecial({ className }: { className?: string }) {
  return (
    <video
      src="/special-spinner.mp4"
      width="1000"
      height="1000"
      autoPlay
      loop
      muted
      className={clsx(className, "rounded-4xl shadow")}
    />
  );
}
