import clsx from "clsx";
import Checkbox from "./ui-checkbox";

type PathologyInformation = {
  id: number;
  name: string;
};
export type UiListButtonAtlasProps = {
  className?: string;
  index: number;
  informationOfPathology: PathologyInformation;
};

export function UiListButtonTest({
  className,
  index,
  informationOfPathology,
}: UiListButtonAtlasProps) {
  return (
    <div
      className={clsx(
        className,
        "flex text-[18px] pb-4 font-medium gap-2 cursor-pointer"
      )}
    >
      <div>{index}.</div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
      <div className="ml-auto w-6 h-6 flex justify-center items-center">
        <input
          type="checkbox"
          className="
    w-5 h-5 
    appearance-none 
    border border-gray-400 rounded 
    transition duration-200 ease-in-out
    transform 
    checked:scale-110 
    checked:bg-[#63a0e2] 
    checked:border-[#7BAEE4]
    checked:[&:after]:content-['✔'] 
    checked:[&:after]:text-white 
    checked:[&:after]:text-xs
    checked:[&:after]:flex 
    checked:[&:after]:items-center 
    checked:[&:after]:justify-center
  "
        />
      </div>
    </div>
  );
}

