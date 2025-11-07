import clsx from "clsx";
import { InputHTMLAttributes, PropsWithRef, useId } from "react";

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
          "w-[323px] h-[30px] rounded-[8px] border border-[#C0C7CF] text-[16px] text-zinc-500 px-2 shadow-[0px_5px_5px_rgba(0,0,0,0.2)]",
          "focus:outline-none focus:ring-2 focus:ring-slate-300"
        )}
      />
      {error && <div className="text-rose-400 text-sm">{error}</div>}
    </div>
  );
}

