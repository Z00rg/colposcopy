import React, {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";
import {queryClient} from "@/shared/api/query-client";
import {Button} from "@/shared/ui/Button";

const uploadScheme = (data: FormData) => {
    return apiInstance
        .post("/schemes/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export type AddSchemeFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function AddSchemeForm({caseId, closeModal}: AddSchemeFormProps) {
    const [schemeImage, setSchemeImage] = useState<File | null>(null);
    const [schemeDescriptionImage, setSchemeDescriptionImage] =
        useState<File | null>(null);
    const schemeFileInputRef = useRef<HTMLInputElement>(null);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadScheme,
        onSuccess: () => {
            setSchemeImage(null);
            setSchemeDescriptionImage(null);
            closeModal();
            queryClient.invalidateQueries();
            if (schemeFileInputRef.current) schemeFileInputRef.current.value = "";
            if (descriptionFileInputRef.current)
                descriptionFileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении схемы:", error);
            alert("Ошибка при добавлении схемы");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseId || !schemeImage || !schemeDescriptionImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();
        formData.append("case", caseId.toString());
        formData.append("scheme_img", schemeImage);
        formData.append("scheme_description_img", schemeDescriptionImage);

        mutation.mutate(formData);
    };

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