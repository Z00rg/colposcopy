import clsx from "clsx";
import { useEffect, useState } from "react";

export type UiErrorMessageProps = {
  className?: string;
  children: string;
  condition: boolean;
};

export function UiErrorMessage({
  className,
  children,
  condition,
}: UiErrorMessageProps) {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (condition) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    showError && (
      <div className={clsx(className, "absolute -bottom-0 left-0 right-0 flex justify-center")}>
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 shadow-sm opacity-90">
          <span>❗</span>
          <span className="font-medium">
            {children}
          </span>
        </div>
      </div>
    )
  );
}
