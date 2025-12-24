"use client";

import clsx from "clsx";
import {useRouter} from "next/navigation";
import {useState} from "react";

type PathologyInformation = {
    id: number;
    name: string;
};

export type UiListButtonClinicProps = {
    className?: string;
    index: number;
    informationOfPathology: PathologyInformation;
    cases: { id: number }[];
    isLoading?: boolean;
};

export function UiListButtonClinic({
                                       className,
                                       index,
                                       informationOfPathology,
                                       cases,
                                       isLoading,
                                   }: UiListButtonClinicProps) {
    const [active, setActive] = useState(false);
    const router = useRouter();

    const handleCaseClick = (id: number) => {
        router.push(`/case/${id}`);
    };

    if (isLoading) {
        return (
            <div
                className={clsx(
                    className,
                    "flex w-full flex-col border-b border-gray-200 rounded-lg px-3 py-3 animate-pulse"
                )}
            >
                <div className="flex items-center text-[18px] font-medium gap-3 px-1 py-1">
                    <div className="w-4 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1 h-6 bg-gray-300 rounded"></div>
                    <div className="w-2.75 h-4.5 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={clsx(
                className,
                "flex w-full flex-col select-none border-b border-gray-200 rounded-lg px-3 py-3 transition-all duration-200 ease-out",
                "hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm cursor-pointer"
            )}
        >
            {/* Верхняя строка */}
            <div
                className="flex items-center text-[18px] font-medium gap-3 px-1 py-1"
                onClick={() => setActive(!active)}
            >
                <div className="text-gray-600 font-semibold">{index}.</div>

                <div className="wrap-break-word whitespace-normal flex-1 text-gray-800">
                    {informationOfPathology.name}
                </div>

                <ArrowRight
                    className={clsx(
                        "transition-transform duration-300 ease-in-out w-2.75 h-4.5",
                        active && "rotate-90"
                    )}
                />
            </div>

            {/* Раскрывающаяся часть */}
            <div
                className={clsx(
                    "transition-all duration-300 ease-in-out overflow-hidden",
                    active ? "max-h-125 opacity-100 mt-2" : "max-h-0 opacity-0"
                )}
            >
                <div className="flex flex-col gap-2 pl-9 pr-2 pb-2">
                    {cases.map((caseItem, idx) => (
                        <div
                            key={caseItem.id}
                            className="flex items-center gap-3 text-[16px] text-gray-700 leading-tight py-1.5 px-1.5 rounded-lg cursor-pointer transition-all duration-150 hover:bg-blue-100 hover:text-blue-800"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCaseClick(caseItem.id);
                            }}
                        >
                            {/* Точка-маркер */}
                            <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>

                            <span>Случай {idx + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export const ArrowRight = ({className}: { className?: string }) => (
    <svg
        className={className}
        width="9"
        height="16"
        viewBox="0 0 9 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M8.70711 8.70711C9.09763 8.31658 9.09763 7.68342 8.70711 7.29289L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L6.58579 8L0.928932 13.6569C0.538408 14.0474 0.538408 14.6805 0.928932 15.0711C1.31946 15.4616 1.95262 15.4616 2.34315 15.0711L8.70711 8.70711ZM6 8V9H8V8V7H6V8Z"
            fill="#6B7280"
        />
    </svg>
);
