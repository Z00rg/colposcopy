import clsx from "clsx";

type PathologyInformation = {
  id: number;
  name: string;
};

export type UiListButtonAtlasProps = {
  className?: string;
  index: number;
  informationOfPathology: PathologyInformation;
  onClick: () => void;
};

export function UiListButtonAtlas({
  className,
  index,
  informationOfPathology,
  onClick,
}: UiListButtonAtlasProps) {
  return (
    <div
      className={clsx(
        className,
        "flex items-center text-[18px] font-medium gap-3 cursor-pointer select-none border-b border-[#E0E0E0] px-3 py-3 rounded-xl transition-all duration-200 ease-out",
        "hover:bg-blue-50 hover:border-blue-400 hover:shadow-md hover:scale-[1.01]"
      )}
      onClick={onClick}
    >
      <div className="text-gray-700 font-semibold">{index}.</div>

      <div className="break-words whitespace-normal flex-1 text-gray-800">
        {informationOfPathology.name}
      </div>
    </div>
  );
}
