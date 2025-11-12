import clsx from "clsx";
import { InputHTMLAttributes, PropsWithRef, useId, useEffect, useState } from "react";

export type UiTextFieldProps = {
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  inputProps?: PropsWithRef<InputHTMLAttributes<HTMLInputElement>>;
};

export function UiWhiteTextField({
  className,
  error,
  label,
  placeholder,
  inputProps,
}: UiTextFieldProps) {
  const id = useId();
  const [isActive, setIsActive] = useState(!inputProps?.disabled);

  useEffect(() => {
    setIsActive(!inputProps?.disabled);
  }, [inputProps?.disabled]);

  return (
    <div className={clsx(className, "flex flex-col gap-1")}>
      {label && (
        <label htmlFor={id} className="block text-[#717171] font-medium text-[15px]">
          {label}
        </label>
      )}
      <input
        {...inputProps}
        id={id}
        placeholder={placeholder}
        className={clsx(
          inputProps?.className,
          "w-full h-[30px] rounded-[8px] border border-[#C0C7CF] text-[16px] text-zinc-600 px-2 bg-white transition-all duration-300 ease-in-out shadow-[0px_4px_4px_rgba(0,0,0,0.15)] focus:outline-none focus:ring-2 focus:ring-[#A9C9E6]",
          isActive &&
            "border-[#639EDD] ring-1 ring-[#639EDD]/60 bg-[#F9FCFF] animate-[pulse_2s_ease-in-out_infinite]"
        )}
      />
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}
