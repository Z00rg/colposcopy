import clsx from "clsx";

export function UiProgressBar({
  className,
  tasks,
  numOfCurrentTask,
}: {
  className?: string;
  tasks: any;
  numOfCurrentTask: number;
}) {

  return (
    <div
      className={clsx(
        className,
        "flex border-[#DEDEDE] bg-[#FFFFFF] rounded-[20px] max-w-[340px] h-7 px-3 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-x-auto"
      )}
    >
      {tasks.items.map((_, index) => (
        <button
          className={clsx("flex w-12 flex-shrink-0 justify-center items-center cursor-pointer", {
            "border-b-[2px] border-[#2997F1]": index <= numOfCurrentTask,
          })}
          key={index}
        >
          <span className="font-normal text-[16px]">{index + 1}</span>
        </button>
      ))}
    </div>
  );
}
