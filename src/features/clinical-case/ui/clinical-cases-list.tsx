"use client";

import {UiList} from "@/shared/ui/ui-list";
import clsx from "clsx";
import {UiListButtonClinic} from "@/shared/ui/ui-list-button-clinic";
import {useClinicalCases} from "../model/use-clinical-cases";
import {UiError} from "@/shared/ui/ui-error";

export function ClinicalCasesList({className, adminList}: { className?: string, adminList?: boolean }) {
    const {items, isLoading, isError} = useClinicalCases();
    const isEmptyText = !isLoading && !isError && items.length === 0;

    return (
        <UiList className={clsx(className, "mt-4 items-start")}>
            {/* Ошибка загрузки списка клинических случаев */}
            {isError && (
                <UiError>
                    Не удалось загрузить список клинических случаев
                </UiError>
            )}

            {/* Ошибка не заполненных клинических случаев */}
            {isEmptyText && (
                <div className="flex text-[18px] pb-4 font-medium">
                    Нет доступных клинических случаев
                </div>
            )}

            {/* Скелетон лоадер */}
            {isLoading && (
                <>
                    {[...Array(4)].map((_, index) => (
                        <UiListButtonClinic
                            key={`skeleton-${index}`}
                            className="w-full"
                            index={index + 1}
                            informationOfPathology={{
                                id: 0,
                                name: "",
                            }}
                            cases={[]}
                            isLoading={true}
                            pathologyId={index}
                        />
                    ))}
                </>
            )}

            {/* Отображение списка клинических случаев */}
            {!isLoading && items &&
                items.map((item, index) => (
                    item.cases.length > 0 && <UiListButtonClinic
                        className="w-full"
                        key={item.id}
                        index={index + 1}
                        informationOfPathology={item}
                        cases={item.cases}
                        adminList={adminList}
                        pathologyId={item.id}
                    />
                ))}
        </UiList>
    );
}
