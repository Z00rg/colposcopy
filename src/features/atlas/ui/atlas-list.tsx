"use client";

import {UiList} from "@/shared/ui/ui-list";
import {useAtlasList} from "../model/use-atlas-list";
import {UiListButtonAtlas} from "@/shared/ui/ui-list-button-atlas";
import clsx from "clsx";
import {useTutorialsList} from "../model/use-tutorials-list";
import {UiError} from "@/shared/ui/ui-error";
import React from "react";
import {useAdminAtlasList} from "@/features/atlas/model/use-admin-atlas-list";
import {UiModal} from "@/shared/ui/UiModal";
import {AddPathologyForm, AddTutorialForm} from "@/features/admin";
import {Button} from "@/shared/ui/Button";

export function AtlasList({className, adminList}: { className?: string, adminList?: boolean }) {
    const {items, isLoading, isError, handleClick} = useAtlasList(adminList);
    const {tutorials, isLoadingTutorials, isErrorTutorials, handleTutorialClick} = useTutorialsList();

    const {handleDeletePathology, handleDeleteTutorial} = useAdminAtlasList();

    const isEmptyText = !isLoading && !isError && items.length === 0;
    const isEmptyTutorials = !isLoadingTutorials &&
        !isErrorTutorials && tutorials.length === 0;

    return (
        <UiList className={clsx(className, "mt-4 items-start")}>
            <div className="w-full flex flex-row justify-between">
                <div className="font-bold text-[18px]">Обучение</div>
                {adminList && <UiModal className="mr-3" button={<Button variant="secondary">+</Button>}>{({close}) => (
                    <AddTutorialForm closeModal={close}/>
                )}</UiModal>}
            </div>

            {/* Ошибка загрузки */}
            {(isErrorTutorials) && (
                <UiError>
                    Не удалось загрузить обучающие материалы
                </UiError>
            )}

            {/* Пустой список */}
            {isEmptyTutorials && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных материалов
                </div>
            )}


            {/* Скелетон лоадер */}
            {isLoadingTutorials && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <UiListButtonAtlas
                            key={`skeleton-tutorial-${index}`}
                            className="w-full"
                            index={index + 1}
                            type="tutorial"
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            pathologyOrTutorialId ={index}
                            onClick={() => {
                            }}
                            isLoading={true}
                        />
                    ))}
                </>
            )}

            {/* Объединенный список: сначала файлы, потом уроки */}
            {!isLoadingTutorials && (
                <>
                    {/* Уроки */}
                    {tutorials.map((item, index) => (
                        <UiListButtonAtlas
                            className="w-full"
                            key={item.id}
                            index={index + 1} // Продолжаем нумерацию после файлов
                            informationOfPathology={item}
                            type="tutorial"
                            onClick={adminList ? () => {} : () => handleTutorialClick(item.id)}
                            onClickAdminDelete={() => handleDeleteTutorial(item.id)}
                            pathologyOrTutorialId={item.id}
                            adminList={adminList}
                        />
                    ))}
                </>
            )}

            {/* Список патологий */}
            <div className="w-full flex flex-row justify-between">
                <div className="font-bold text-[18px]">Атлас</div>
                {adminList && <UiModal className="mr-3" button={<Button variant="secondary">+</Button>}>
                    {({close}) => (
                        <AddPathologyForm closeModal={close}/>
                    )}
                </UiModal>}
            </div>

            {/* Ошибка загрузки списка патологий */}
            {isError && (
                <UiError>
                    Не удалось загрузить список патологий
                </UiError>
            )}

            {/* Пустой список патологий*/}
            {isEmptyText && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных патологий
                </div>
            )}

            {/* Скелетон лоадер для патологий */}
            {isLoading && (
                <>
                    {[...Array(3)].map((_, index) => (
                        <UiListButtonAtlas
                            key={`skeleton-atlas-${index}`}
                            className="w-full"
                            index={index + 1}
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            type="pathology"
                            pathologyOrTutorialId ={index}
                            onClick={() => {
                            }}
                            isLoading={true}
                        />
                    ))}
                </>
            )}

            {/* Отображение списка патологий */}
            {!isLoading && items &&
                items.map((item, index) => (
                    <UiListButtonAtlas
                        className="w-full"
                        key={item.id}
                        index={index + 1}
                        type="pathology"
                        informationOfPathology={item}
                        onClick={adminList ? () => {} : () => handleClick(item.id)}
                        onClickAdminDelete={() => handleDeletePathology(item.id)}
                        pathologyOrTutorialId={item.id}
                        adminList={adminList}
                    />
                ))}
        </UiList>
    );
}
