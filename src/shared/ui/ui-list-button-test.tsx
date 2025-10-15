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
  isChecked: boolean;
  onToggle: (id: number) => void;
};

export function UiListButtonTest({
  className,
  index,
  informationOfPathology,
  isChecked,
  onToggle,
}: UiListButtonAtlasProps) {
  const handleClick = () => {
    onToggle(informationOfPathology.id);
  };

  return (
    <div
      className={clsx(
        className,
        "flex text-[18px] pb-4 font-medium gap-3 cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div>{index}.</div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
      <div
        className="ml-auto w-6 h-6 flex justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <UiCheckBox checked={isChecked} onChange={handleClick} />
      </div>
    </div>
  );
}

