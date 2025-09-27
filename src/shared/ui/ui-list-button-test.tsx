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
      <div>
        {index}. 
      </div>
      <div className="break-words whitespace-normal">
        {informationOfPathology.name}
      </div>
      <input className="ml-auto w-5 h-5" type="checkbox" />
    </div>
  );
}

