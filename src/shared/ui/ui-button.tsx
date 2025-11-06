import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";


export type UiButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function UiButton({ className, ...props }: UiButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        "w-[323px] h-[69px] rounded-[20px] cursor-pointer flex items-center justify-center text-3xl bg-[#7BAEE4] hover:bg-[#6899D2] transition delay-150 duration-300 text-white shadow-[0px_30px_30px_rgba(0,0,0,0.2)]"
      )}
    />
  );
}
