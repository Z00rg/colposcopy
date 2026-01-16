"use client";

import {UiList} from "@/shared/ui/ui-list";
import {useAtlasList} from "../model/use-atlas-list";
import {UiListButtonAtlas} from "@/shared/ui/ui-list-button-atlas";
import clsx from "clsx";
import {useTutorialsList} from "../model/use-tutorials-list";
import {UiError} from "@/shared/ui/ui-error";
import React from "react";
import {useDeleteMutationQuery} from "@/entities/admin";

export function AtlasList({className, adminList }: { className?: string, adminList?: boolean }) {
    const {items, isLoading, isError, handleClick} = useAtlasList(adminList);
    const {tutorials, isLoadingTutorials, isErrorTutorials, handleTutorialClick } = useTutorialsList();

    const useDeleteMutation = useDeleteMutationQuery();

    const handleDelete = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить эту патологию?")) {
            useDeleteMutation.mutate(id);
        }
    };

    const isEmptyText = !isLoading && !isError && items.length === 0;
    const isEmptyTutorials = !isLoadingTutorials &&
        !isErrorTutorials && tutorials.length === 0;

    return (
        <UiList className={clsx(className, "mt-4 items-start")}>
            <div className="font-bold text-[18px]">Обучение</div>

            {/* Ошибка загрузки */}
            {(isErrorTutorials ) && (
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
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            onClick={() => {}}
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
                            onClick={!adminList ? () => handleTutorialClick(item.id) : () => {}}
                            adminList={adminList}
                        />
                    ))}
                </>
            )}

            {/* Список патологий */}
            <div className="font-bold text-[18px]">Атлас</div>

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
                        informationOfPathology={item}
                        onClick={!adminList ? () => handleClick(item.id): () => {} }
                        onClickAdmin={() => handleDelete(item.id)}
                        adminList={adminList}
                    />
                ))}
        </UiList>
    );
}
