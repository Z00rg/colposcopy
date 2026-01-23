"use client";

import clsx from "clsx";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Dialog} from "@/shared/ui/Dialog";
import {Modal} from "@/shared/ui/Modal";
import {AddClinicalCaseForm} from "@/features/admin/ui/addClinicalCaseForm";
import {Button} from "@/shared/ui/Button";
import {useDeleteClinicalCase} from "@/features/admin/model/useDeleteClinicalCaseForm";
import {Menu, MenuItem, MenuTrigger} from "@/shared/ui/Menu";
import {MoreHorizontal} from "lucide-react";

type PathologyInformation = {
    id: number;
    name: string;
};

export type UiListButtonClinicProps = {
    className?: string;
    index: number;
    informationOfPathology: PathologyInformation;
    cases: { id: number, name: string }[];
    isLoading?: boolean;
    adminList?: boolean;
    pathologyId: number;
};

export function UiListButtonClinic({
                                       className,
                                       index,
                                       informationOfPathology,
                                       cases,
                                       isLoading,
                                       adminList,
                                       pathologyId,
                                   }: UiListButtonClinicProps) {
    const [active, setActive] = useState(false);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {handleDeleteClinicalCase} = useDeleteClinicalCase();

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
            {/* Модалка добавления случая */}
            <Modal isOpen={isModalOpen}>
                <Dialog>
                    <AddClinicalCaseForm
                        pathology={pathologyId}
                        closeModal={() => setIsModalOpen(!isModalOpen)}
                    />
                </Dialog>
            </Modal>

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
                    active ? "max-h-1000 opacity-100 mt-2" : "max-h-0 opacity-0"
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
                            <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0"></div>

                            {adminList ? <div>{caseItem.name}</div> : <span>Случай {idx + 1}</span>}

                            {adminList && <div className="ml-auto">
                                <Button
                                    variant="secondary"
                                    className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                                    aria-label="Удалить патологию"
                                    onPress={() => handleDeleteClinicalCase(caseItem.id)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </Button>
                            </div>}

                        </div>
                    ))}
                    {adminList && <div
                        className="flex items-center gap-1 text-[16px] text-gray-700 bg-blue-100/35 leading-tight py-1.5 rounded-lg cursor-pointer transition-all duration-150 hover:bg-blue-100 hover:text-blue-800"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}
                    >
                        {/* Точка-маркер */}
                        <div className="w-5 h-5 flex items-center justify-center text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>

                        <span>Добавить клинический случай</span>
                    </div>}
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
