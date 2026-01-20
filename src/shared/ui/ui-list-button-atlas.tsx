"use client";
import clsx from "clsx";
import {MenuTrigger, Menu, MenuItem} from './Menu';
import {Button} from './Button';
import {MoreHorizontal} from 'lucide-react';
import {EditPathologyForm} from "@/features/admin";
import React, {useState} from "react";
import {Modal} from "@/shared/ui/Modal";
import {Dialog} from "@/shared/ui/Dialog";
import {PathologyImageForm} from "@/features/admin/";

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
    pathologyOrTutorialId: number;
    type: "pathology" | "tutorial";
    isLoading?: boolean;
    adminList?: boolean;
};

export function UiListButtonAtlas({
                                      className,
                                      index,
                                      informationOfPathology,
                                      onClick,
                                      onClickAdminDelete,
                                      pathologyOrTutorialId,
                                      type,
                                      isLoading,
                                      adminList,
                                  }: UiListButtonAtlasProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

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

            {/* Модалка редактирования */}
            <Modal isOpen={isModalOpen}>
                <Dialog>
                    {type === "pathology" && <EditPathologyForm
                        pathologyId={pathologyOrTutorialId}
                        closeModal={() => setIsModalOpen(!isModalOpen)}
                    />}
                    {type === "tutorial" && <div className="flex flex-col">Тут будет модалка изменения туториала</div>}
                </Dialog>
            </Modal>

            <Modal isOpen={isAddImageModalOpen}>
                <Dialog>
                    {type === "pathology" && <PathologyImageForm
                        pathologyOrImageId={pathologyOrTutorialId}
                        closeModal={() => setIsAddImageModalOpen(!isAddImageModalOpen)}
                        typeOfMethod="post"
                    />}
                </Dialog>
            </Modal>

            {adminList && <MenuTrigger>
                <Button aria-label="Actions" variant="secondary">
                    <MoreHorizontal className="w-5 h-5"/>
                </Button>
                <Menu>
                    <MenuItem onAction={() => setIsModalOpen(!isModalOpen)} isDisabled={type === "tutorial"}>Редактировать
                        текст</MenuItem>
                    {type === "pathology" && <MenuItem onAction={() => setIsAddImageModalOpen(!isAddImageModalOpen)}>Добавить
                        изображение</MenuItem>}
                    <MenuItem onAction={onClickAdminDelete}>Удалить</MenuItem>
                </Menu>
            </MenuTrigger>}
        </div>
    );
}