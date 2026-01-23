import {Button} from "@/shared/ui/Button";
import {useImagePathologyForm} from "@/features/admin/model/useImagePathologyForm";
import Image from "next/image";
import React from "react";

export type PathologyImageFormProps = {
    pathologyOrImageId: number,
    closeModal: () => void,
    typeOfMethod: "post" | "patch",
    currentImage?: string,
};

export function PathologyImageForm({ pathologyOrImageId, closeModal, typeOfMethod, currentImage }: PathologyImageFormProps) {
    const { mutation, fileInputRef, setImage, handleSubmit } = useImagePathologyForm({ pathologyOrImageId, closeModal, typeOfMethod });

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">{typeOfMethod === "post" ? "Добавить изображение патологии" : "Заменить изображение патологии"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Изображение</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                {/* Превью текущего изображения */}
                {currentImage && typeOfMethod === "patch" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Текущее изображение
                        </label>
                        <Image
                            src={currentImage}
                            width={500}
                            height={500}
                            alt={`Текущее изображение`}
                            className="w-full h-48 object-contain bg-gray-100 rounded border"
                        />
                    </div>
                )}

                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="secondary"
                        isDisabled={mutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        variant="secondary"
                        isPending={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        {mutation.isPending ? "" : typeOfMethod === "post" ? "Добавить изображение" : "Заменить изображение"}
                    </Button>
                </div>
            </form>
        </div>
    );
}