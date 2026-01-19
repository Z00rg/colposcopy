"use client";

import clsx from "clsx";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {Dialog} from "@/shared/ui/Dialog";
import {Modal} from "@/shared/ui/Modal";
import {AddClinicalCaseForm} from "@/features/admin/ui/addClinicalCaseForm";
import {Button} from "@/shared/ui/Button";
import {useDeleteClinicalCase} from "@/features/admin/model/useDeleteClinicalCaseForm";

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

    const { handleDeleteClinicalCase } = useDeleteClinicalCase();

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
                    active ? "max-h-500 opacity-100 mt-2" : "max-h-0 opacity-0"
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

                            {adminList && <Button
                                className="ml-auto"
                                onClick={() => {handleDeleteClinicalCase(caseItem.id)}}
                                variant="secondary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" fill="#CCCCCC"
                                    >
                                    <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 16.140625 6 C 14.303372 6 12.582924 6.9194511 11.564453 8.4492188 L 9.1972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 9.7636719 15 A 1.50015 1.50015 0 0 0 10.208984 15 L 36.330078 15 L 34.757812 29.679688 A 1.50015 1.50015 0 1 0 37.740234 29.998047 L 39.347656 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 38.802734 12 L 36.435547 8.4492188 C 35.416254 6.9202798 33.696001 6 31.859375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 16.140625 9 L 31.859375 9 C 32.696749 9 33.474746 9.4162203 33.939453 10.113281 L 35.197266 12 L 12.802734 12 L 14.060547 10.113281 A 1.50015 1.50015 0 0 0 14.0625 10.111328 C 14.525982 9.4151428 15.301878 9 16.140625 9 z M 10.572266 17.650391 A 1.50015 1.50015 0 0 0 9.1171875 19.330078 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 37.246094 34.605469 A 1.50015 1.50015 0 1 0 34.263672 34.287109 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 12.099609 19.011719 A 1.50015 1.50015 0 0 0 10.572266 17.650391 z"></path>
                                </svg>
                            </Button>}
                        </div>
                    ))}
                    {adminList && <div
                        className="flex items-center gap-3 text-[16px] text-gray-700 bg-blue-100/35 leading-tight py-1.5 px-1.5 rounded-lg cursor-pointer transition-all duration-150 hover:bg-blue-100 hover:text-blue-800"
                        onClick={() => {
                            setIsModalOpen(!isModalOpen);
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
