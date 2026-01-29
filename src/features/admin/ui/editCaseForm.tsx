import React, { useState, useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { useLayerForm } from "@/features/admin/model/useLayerForm";
import { useSchemeForm } from "@/features/admin/model/useSchemeForm";
import clsx from "clsx";
import Image from "next/image";

export type EditCaseFormProps = {
    caseId: number;
    closeModal: () => void;
    // Данные существующих слоев и схемы
    layers?: Array<{
        id: number;
        number: number;
        image: string;
        description: string;
    }>;
    scheme?: {
        id: number;
        image: string;
        descriptionImage: string;
    };
};

export function EditCaseForm({ caseId, closeModal, layers = [], scheme }: EditCaseFormProps) {
    // Стадии: 0-2 для слоев (1-3), 3 для схемы
    const [currentStage, setCurrentStage] = useState(0);
    const isSchemeStage = currentStage === 3;

    // Определяем, какой метод использовать для каждого слоя
    const layer1Method = layers[0]?.id ? "patch" : "post";
    const layer2Method = layers[1]?.id ? "patch" : "post";
    const layer3Method = layers[2]?.id ? "patch" : "post";
    const schemeMethod = scheme?.id ? "patch" : "post";

    // Хуки для работы со слоями с динамическими методами и caseId для POST
    const layer1Form = useLayerForm(
        layer1Method === "post"
            ? { caseId, closeModal, typeOfMethod: "post" }
            : { closeModal, typeOfMethod: "patch" }
    );
    const layer2Form = useLayerForm(
        layer2Method === "post"
            ? { caseId, closeModal, typeOfMethod: "post" }
            : { closeModal, typeOfMethod: "patch" }
    );
    const layer3Form = useLayerForm(
        layer3Method === "post"
            ? { caseId, closeModal, typeOfMethod: "post" }
            : { closeModal, typeOfMethod: "patch" }
    );

    // Хук для работы со схемой с динамическим методом и caseId для POST
    const schemeForm = useSchemeForm(
        schemeMethod === "post"
            ? { caseId, closeModal, typeOfMethod: "post" }
            : { closeModal, typeOfMethod: "patch" }
    );

    // Получаем данные текущего слоя
    const currentLayer = layers[currentStage];

    // Извлекаем все значения из хуков заранее
    const layerForms = [layer1Form, layer2Form, layer3Form];
    const currentLayerIndex = isSchemeStage ? 0 : currentStage;
    const currentForm = layerForms[currentLayerIndex];

    // Извлекаем все refs и значения заранее
    const {
        setNumber: setLayerNumber,
        fileInputRef: layerFileInputRef,
        setLayerImage,
        layerDescription,
        setLayerDescription,
        mutation: layerMutation,
    } = currentForm;

    const {
        schemeFileInputRef,
        setSchemeImage,
        descriptionFileInputRef,
        setSchemeDescriptionImage,
        mutation: schemeMutation,
    } = schemeForm;

    // Определяем активную мутацию
    const activeMutation = isSchemeStage ? schemeMutation : layerMutation;

    // Проверка заполненности слоёв для блокировки кнопок
    const isLayer1Filled = layers[0]?.id && layers[0]?.image && layers[0]?.description;
    const isLayer2Filled = layers[1]?.id && layers[1]?.image && layers[1]?.description;
    const isLayer3Filled = layers[2]?.id && layers[2]?.image && layers[2]?.description;
    const areAllLayersFilled = isLayer1Filled && isLayer2Filled && isLayer3Filled;

    // Функция проверки, можно ли перейти на определенную стадию
    const isStageAccessible = (stageIndex: number) => {
        if (stageIndex === 0) return true; // Слой 1 всегда доступен
        if (stageIndex === 1) return isLayer1Filled; // Слой 2 доступен только если заполнен слой 1
        if (stageIndex === 2) return isLayer1Filled && isLayer2Filled; // Слой 3 доступен если заполнены слои 1 и 2
        if (stageIndex === 3) return areAllLayersFilled; // Схема доступна только если заполнены все 3 слоя
        return false;
    };

    // Устанавливаем номер слоя при переключении стадий
    useEffect(() => {
        if (!isSchemeStage) {
            setLayerNumber((currentStage + 1).toString());
        }
    }, [currentStage, isSchemeStage, setLayerNumber]);

    // Устанавливаем описание слоя при переключении или загрузке данных
    useEffect(() => {
        if (!isSchemeStage && currentLayer?.description) {
            setLayerDescription(currentLayer.description);
        }
    }, [currentStage, isSchemeStage, currentLayer, setLayerDescription]);

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSchemeStage) {
            schemeForm.handleSubmit(e, scheme?.id);
        } else {
            currentForm.handleSubmit(e, currentLayer?.id);
        }
    };

    return (
        <div className="w-full max-w-2xl">
            {/* Переключатель стадий */}
            <div className="flex gap-2 mb-6 overflow-x-auto lg:justify-center pb-2">
                {[1, 2, 3, "Схема"].map((stage, index) => {
                    const isAccessible = isStageAccessible(index);
                    const isActive = currentStage === index;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => isAccessible && setCurrentStage(index)}
                            disabled={!isAccessible}
                            className={clsx(
                                "px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap",
                                isActive && "bg-blue-600 text-white",
                                !isActive && isAccessible && "bg-gray-200 text-gray-700 hover:bg-gray-300",
                                !isAccessible && "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50"
                            )}
                            title={
                                !isAccessible
                                    ? index === 1
                                        ? "Сначала заполните Слой 1"
                                        : index === 2
                                            ? "Сначала заполните Слои 1 и 2"
                                            : index === 3
                                                ? "Сначала заполните все 3 слоя"
                                                : ""
                                    : ""
                            }
                        >
                            {typeof stage === "number" ? `Слой ${stage}` : stage}
                        </button>
                    );
                })}
            </div>

            {/* Форма редактирования */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isSchemeStage ? (
                    // Форма для слоя
                    <>
                        {/* Превью текущего изображения */}
                        {currentLayer?.image && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Текущее изображение
                                </label>
                                <Image
                                    src={currentLayer.image}
                                    width={200}
                                    height={200}
                                    alt={`Слой ${currentStage + 1}`}
                                    className="w-full h-full max-h-[35svh] object-contain bg-gray-100 rounded border"
                                />
                            </div>
                        )}

                        {/* Загрузка нового изображения */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {currentLayer?.image ? "Новое изображение слоя" : "Изображение слоя"}
                            </label>
                            <input
                                type="file"
                                ref={layerFileInputRef}
                                onChange={(e) => setLayerImage(e.target.files?.[0] || null)}
                                accept="image/*"
                                className="w-full bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
                            />
                        </div>

                        {/* Описание слоя */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Описание слоя
                            </label>
                            <textarea
                                value={layerDescription}
                                onChange={(e) => setLayerDescription(e.target.value)}
                                className="w-full h-[27svh]
                                   text-[16px] font-normal bg-white border border-gray-200 pt-3 px-4
                                   shadow-sm rounded-xl
                                   overflow-y-auto overflow-x-hidden scroll-smooth
                                   text-justify resize-none
                                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                   placeholder:text-gray-400"
                                placeholder="Введите описание слоя"
                                rows={4}
                            />
                        </div>
                    </>
                ) : (
                    // Форма для схемы
                    <>
                        {/* Превью текущей схемы */}
                        {scheme?.image && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Текущая схема
                                </label>
                                <Image
                                    src={scheme.image}
                                    width={500}
                                    height={500}
                                    alt="Схема"
                                    className="w-full h-48 object-contain bg-gray-100 rounded border"
                                />
                            </div>
                        )}

                        {/* Загрузка новой схемы */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {scheme?.image ? "Новое изображение схемы" : "Изображение схемы"}
                            </label>
                            <input
                                type="file"
                                ref={schemeFileInputRef}
                                onChange={(e) => setSchemeImage(e.target.files?.[0] || null)}
                                accept="image/*"
                                className="w-full bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
                            />
                        </div>

                        {/* Превью описания схемы */}
                        {scheme?.descriptionImage && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Текущее описание схемы
                                </label>
                                <Image
                                    src={scheme.descriptionImage}
                                    width={500}
                                    height={500}
                                    alt="Описание схемы"
                                    className="w-full h-48 object-contain bg-gray-100 rounded border"
                                />
                            </div>
                        )}

                        {/* Загрузка нового описания схемы */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {scheme?.descriptionImage
                                    ? "Новое изображение описания схемы"
                                    : "Изображение описания схемы"}
                            </label>
                            <input
                                type="file"
                                ref={descriptionFileInputRef}
                                onChange={(e) =>
                                    setSchemeDescriptionImage(e.target.files?.[0] || null)
                                }
                                accept="image/*"
                                className="w-full bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
                            />
                        </div>
                    </>
                )}

                {/* Кнопки управления */}
                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="secondary"
                        isDisabled={activeMutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        isPending={activeMutation.isPending}
                        isDisabled={activeMutation.isPending}
                    >
                        {activeMutation.isPending
                            ? ""
                            : isSchemeStage
                                ? scheme
                                    ? "Обновить схему"
                                    : "Добавить схему"
                                : currentLayer
                                    ? "Обновить слой"
                                    : "Добавить слой"}
                    </Button>
                </div>
            </form>
        </div>
    );
}