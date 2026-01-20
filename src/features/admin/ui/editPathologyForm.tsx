import {Button} from "@/shared/ui/Button";
import {useEditPathologyForm} from "@/features/admin/model/useEditPathologyForm";
import clsx from "clsx";
import React from "react";

export type EditPathologyFormProps = {
    pathologyId: number,
    closeModal: () => void,
    className?: string,
};

export function EditPathologyForm ({ pathologyId, closeModal, className }: EditPathologyFormProps) {

    const { handleSubmit, newDescription, setNewDescription, updateMutation } = useEditPathologyForm({ pathologyId, closeModal });

    return (
        <div className={clsx(className, "flex flex-col")}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">

                {/* Textarea в стиле UiTextArea */}
                <div>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full h-[40svh]
                                   text-[16px] font-normal bg-white border border-gray-200 pt-3 px-4
                                   shadow-sm rounded-xl
                                   overflow-y-auto overflow-x-hidden scroll-smooth
                                   text-justify resize-none
                                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                   placeholder:text-gray-400"
                        placeholder="Введите описание патологии..."
                        rows={16}
                        disabled={updateMutation.isPending}
                    />
                </div>

                {/* Кнопки */}
                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="custom"
                        isDisabled={updateMutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        variant="custom"
                        isPending={updateMutation.isPending}
                        isDisabled={updateMutation.isPending || !newDescription.trim()}
                    >
                        {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
                    </Button>
                </div>
            </form>
        </div>
    );
}