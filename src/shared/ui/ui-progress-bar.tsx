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
    <div className="relative">
      {/* Обёртка с ограничением ширины и скроллом */}
      <div className="overflow-x-auto overflow-y-hidden custom-scrollbar max-w-[340px] border-[#DEDEDE] bg-[#FFFFFF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div
          className={clsx(
            className,
            "flex h-7 px-3 w-max"
          )}
        >
          {tasks.items.map((_: any, index: number) => (
            <button
              key={index}
              className={clsx(
                "flex w-12 flex-shrink-0 justify-center items-center cursor-pointer",
                { "border-b-[2px] border-[#2997F1]": index <= numOfCurrentTask }
              )}
            >
              <span className="font-normal text-[16px]">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
