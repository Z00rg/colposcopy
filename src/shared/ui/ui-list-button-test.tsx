import clsx from "clsx";
import { UiCheckBox } from "./ui-checkbox";

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
        "flex text-[18px] pb-4 font-medium gap-3 cursor-pointer"
      )}
    >
      <div>{index}.</div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
      <div className="ml-auto w-6 h-6 flex justify-center items-center">
        <UiCheckBox/>
      </div>
    </div>
  );
}

