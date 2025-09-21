import clsx from "clsx";

type PathologyInformation = {
  id: number;
  name: string;
};
export type UiListButtonAtlasProps = {
  className?: string;
  index: number;
  informationOfPathology: PathologyInformation;
};

export function UiListButtonAtlas({
  className,
  index,
  informationOfPathology,
}: UiListButtonAtlasProps) {
  return (
    <div
      className={clsx(
        className,
        "w-[360px] border-b-1 border-[#BDBDBD] flex text-[18px] pb-2 px-[9px] font-medium gap-2 cursor-pointer"
      )}
    >
      <div>
        {index}. 
      </div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
    </div>
  );
}

