import React from "react";
import {Button} from "@/shared/ui/Button";
import {useSchemeForm} from "@/features/admin/model/useSchemeForm";

export type AddSchemeFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function AddSchemeForm({caseId, closeModal}: AddSchemeFormProps) {
    const {
        handleSubmit,
        setSchemeImage,
        setSchemeDescriptionImage,
        schemeFileInputRef,
        descriptionFileInputRef,
        mutation
    } = useSchemeForm({caseId, closeModal, typeOfMethod: "post"});

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить схему</h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение схемы
                    </label>
                    <input
                        type="file"
                        ref={schemeFileInputRef}
                        onChange={(e) => setSchemeImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение описания схемы
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
                        isPending={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        {mutation.isPending ? "" : "Добавить схему"}
                    </Button>
                </div>
            </form>
        </div>
    );
}