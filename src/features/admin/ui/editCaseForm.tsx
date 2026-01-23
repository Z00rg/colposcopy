import React, { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { useLayerForm } from "@/features/admin/model/useLayerForm";
import { useSchemeForm } from "@/features/admin/model/useSchemeForm";
import clsx from "clsx";

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

export function EditCaseForm({ closeModal, layers = [], scheme }: EditCaseFormProps) {
    // Стадии: 0-2 для слоев (1-3), 3 для схемы
    const [currentStage, setCurrentStage] = useState(0);
    const isSchemeStage = currentStage === 3;

    // Хуки для работы со слоями
    const layer1Form = useLayerForm({ closeModal, typeOfMethod: "patch" });
    const layer2Form = useLayerForm({ closeModal, typeOfMethod: "patch" });
    const layer3Form = useLayerForm({ closeModal, typeOfMethod: "patch" });

    // Хук для работы со схемой
    const schemeForm = useSchemeForm({ closeModal, typeOfMethod: "patch" });

    // Получаем данные текущего слоя
    const currentLayer = layers[currentStage];

    // Извлекаем все значения из хуков заранее
    const layerForms = [layer1Form, layer2Form, layer3Form];
    const currentLayerIndex = isSchemeStage ? 0 : currentStage;
    const currentForm = layerForms[currentLayerIndex];

    // Извлекаем все refs и значения заранее
    const {
        number: layerNumber,
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
            <h3 className="text-xl font-bold mb-4">Редактировать клинический случай</h3>

            {/* Переключатель стадий */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[1, 2, 3, "Схема"].map((stage, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentStage(index)}
                        className={clsx(
                            "px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap",
                            currentStage === index
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        )}
                    >
                        {typeof stage === "number" ? `Слой ${stage}` : stage}
                    </button>
                ))}
            </div>

            {/* Форма редактирования */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isSchemeStage ? (
                    // Форма для слоя
                    <>
                        {/* Номер слоя */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Номер слоя
                            </label>
                            <select
                                value={layerNumber}
                                onChange={(e) => setLayerNumber(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="">Выберите номер слоя</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        {/* Превью текущего изображения */}
                        {currentLayer?.image && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Текущее изображение
                                </label>
                                <img
                                    src={currentLayer.image}
                                    alt={`Слой ${currentStage + 1}`}
                                    className="w-full h-48 object-contain bg-gray-100 rounded border"
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
                                className="w-full border border-gray-300 rounded px-3 py-2"
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
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                placeholder={
                                    currentLayer?.description ||
                                    "Введите описание слоя"
                                }
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
                                <img
                                    src={scheme.image}
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
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>

                        {/* Превью описания схемы */}
                        {scheme?.descriptionImage && (
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Текущее описание схемы
                                </label>
                                <img
                                    src={scheme.descriptionImage}
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
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                    </>
                )}

                {/* Кнопки управления */}
                <div className="flex w-full justify-end gap-3 pt-4">
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