import clsx from "clsx";

export function Profile({ className }: { className?: string }) {

  const info = {
    fio: "Дима Радаев",
    email: "dima.radaev@mail.ru",
  }

  return (
    <div className={clsx(className, "gap-4 px-[17px] py-2.5 text-[18px] flex bg-[#F3F3F3] items-center justify-start shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[20px]")}>
      <div className="flex justify-center items-center"><Man/></div>
      <div className="flex flex-col">
        <div className="font-bold flex flex-wrap">{info.fio}</div>
        <div className="font-medium flex flex-wrap">{info.email}</div>
      </div>
    </div>
  );
}


export const Man = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="26"
    height="30"
    viewBox="0 0 26 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.8446 23.6844C23.7124 21.7128 21.8581 19.4795 18.8392 18.21C17.1126 19.3933 15.015 20.0901 12.7538 20.0901C10.4913 20.0901 8.39373 19.3934 6.66706 18.21C3.6482 19.4795 1.79379 21.7128 0.662235 23.6844C-0.83954 26.2996 0.337885 29.9999 2.93514 29.9999C5.53246 29.9999 12.7538 29.9999 12.7538 29.9999C12.7538 29.9999 19.9745 29.9999 22.5719 29.9999C25.1691 29.9999 26.3465 26.2996 24.8446 23.6844Z"
      fill="#A3B3C4"
    />
    <path
      d="M12.7538 17.6157C17.1883 17.6157 20.7822 14.0937 20.7822 9.74994V7.86568C20.7822 3.52195 17.1883 0 12.7538 0C8.31854 0 4.72412 3.52195 4.72412 7.86574V9.75C4.72412 14.0937 8.3186 17.6157 12.7538 17.6157Z"
      fill="#A3B3C4"
    />
  </svg>
);
