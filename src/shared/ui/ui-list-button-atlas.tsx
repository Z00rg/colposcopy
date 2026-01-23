"use client";
import clsx from "clsx";
import {Button} from './Button';
import React from "react";

type PathologyInformation = {
    id: number;
    name: string;
};

export type UiListButtonAtlasProps = {
    className?: string;
    index: number;
    informationOfPathology: PathologyInformation;
    onClick?: () => void;
    onClickAdminDelete?: () => void;
    isLoading?: boolean;
    adminList?: boolean;
};

export function UiListButtonAtlas({
                                      className,
                                      index,
                                      informationOfPathology,
                                      onClick,
                                      onClickAdminDelete,
                                      isLoading,
                                      adminList,
                                  }: UiListButtonAtlasProps) {


    if (isLoading) {
        return (
            <div
                className={clsx(
                    className,
                    "flex items-center text-[18px] font-medium gap-3 border-b border-gray-200 px-3 py-3 rounded-lg animate-pulse"
                )}
            >
                <div className="w-4 h-6 bg-gray-300 rounded"></div>
                <div className="flex-1 h-6 bg-gray-300 rounded"></div>
            </div>
        );
    }


    return (
        <div
            className={clsx(
                className,
                "flex items-center text-[18px] font-medium gap-3 cursor-pointer select-none border-b border-gray-200 px-3 py-3 rounded-lg transition-all duration-200 ease-out",
                "hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm"
            )}
            onClick={onClick}
        >
            <div className="text-gray-600 font-semibold">{index}.</div>

            <div className="break-words whitespace-normal flex-1 text-gray-800">
                {informationOfPathology.name}
            </div>

            {adminList &&
                <Button
                    variant="secondary"
                    className="p-2 bg-white rounded-lg shadow-md hover:bg-red-50 transition-colors"
                    aria-label="Удалить патологию"
                    onPress={onClickAdminDelete}
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
                </Button>}
        </div>
    );
}