import React, {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";

export type AddSchemeFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function useAddSchemeForm({ caseId, closeModal }: AddSchemeFormProps) {
    const [schemeImage, setSchemeImage] = useState<File | null>(null);
    const [schemeDescriptionImage, setSchemeDescriptionImage] =
        useState<File | null>(null);
    const schemeFileInputRef = useRef<HTMLInputElement>(null);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: (data: FormData) => adminApi.uploadScheme(data),
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

    return {
        handleSubmit,
        schemeFileInputRef,
        setSchemeImage,
        descriptionFileInputRef,
        setSchemeDescriptionImage,
        mutation,
    }
}