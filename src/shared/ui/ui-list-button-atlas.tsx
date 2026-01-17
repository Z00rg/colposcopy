"use client";
import clsx from "clsx";
import {MenuTrigger, Menu, MenuItem } from './Menu';
import {Button} from './Button';
import {MoreHorizontal} from 'lucide-react';

type PathologyInformation = {
    id: number;
    name: string;
};

export type UiListButtonAtlasProps = {
    className?: string;
    index: number;
    informationOfPathology: PathologyInformation;
    onClick: () => void;
    onClickAdminDelete?: () => void;
    onClickAdminEditText?: () => void;
    isLoading?: boolean;
    adminList?: boolean;
};

export function UiListButtonAtlas({
                                      className,
                                      index,
                                      informationOfPathology,
                                      onClick,
                                      onClickAdminDelete,
                                      onClickAdminEditText,
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

            {adminList && <MenuTrigger>
                <Button aria-label="Actions" variant="secondary">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
                <Menu>
                    <MenuItem onAction={onClickAdminEditText} isDisabled>Редактировать текст (скоро)</MenuItem>
                    <MenuItem onAction={() => alert('Редактируем')} isDisabled>Редактировать изображения (скоро)</MenuItem>
                    <MenuItem onAction={onClickAdminDelete}>Удалить</MenuItem>
                </Menu>
            </MenuTrigger>}
        </div>
    );
}