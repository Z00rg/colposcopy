import clsx from "clsx";

export function UiProgressBar({
  className,
  tasks,
  numOfCurrentTask,
  completionByTask,
  changeCurrentTask,
}: {
  className?: string;
  tasks: any;
  numOfCurrentTask: number;
  completionByTask: { taskId: number; isComplete: boolean }[];
  changeCurrentTask?: (index: number) => void;
}) {
  return (
    <div className="overflow-x-auto overflow-y-hidden custom-scrollbar max-w-[340px] border-[#DEDEDE] bg-[#FFFFFF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className={clsx(className, "flex h-7 px-3 w-max")}>
        {tasks.map((task: any, index: number) => {
          const completion = completionByTask.find((t) => t.taskId === task.id);

          const isComplete = completion?.isComplete ?? false;
          const isCurrent = index === numOfCurrentTask;

          return (
            <button
              key={task.id}
              onClick={() => changeCurrentTask?.(index)}
              className={clsx(
                "flex w-12 flex-shrink-0 justify-center items-center cursor-pointer transition-colors duration-200",
                {
                  "border-b-[2px] border-[#2997F1]": isComplete,
                  "bg-[#2997F1] text-white rounded-full scale-110 shadow-md":
                    isCurrent,
                }
              )}
            >
              <span className="font-normal text-[16px]">{index + 1}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
