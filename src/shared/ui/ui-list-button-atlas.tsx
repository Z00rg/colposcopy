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
        "border-b border-[#BDBDBD] flex text-[18px] pb-4 font-medium gap-2 cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:border-blue-400 hover:shadow-sm"
      )}
      onClick={onClick}
    >
      <div>{index}.</div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
    </div>
  );
}
