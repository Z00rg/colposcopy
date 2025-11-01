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
        "flex items-center text-[18px] font-medium gap-3 cursor-pointer select-none border-b border-[#E0E0E0] px-3 py-3 rounded-xl transition-all duration-200 ease-out",
        {
          // hover эффект
          "hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01]": true,
          // активное состояние (остается выделенным)
          "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-400 shadow-md": isChecked,
        }
      )}
      onClick={handleClick}
    >
      <div className="text-gray-700 font-semibold">{index}.</div>

      <div className="break-words whitespace-normal flex-1 text-gray-800">
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
