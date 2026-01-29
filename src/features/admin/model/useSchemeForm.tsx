import React, {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

export type SchemePostFormProps = {
    caseId: number,
    closeModal: () => void,
    typeOfMethod: "post";
};

export type SchemePatchFormProps = {
    closeModal: () => void,
    typeOfMethod: "patch";
};

type SchemeFormProps = SchemePostFormProps | SchemePatchFormProps;

function isPostProps(props: SchemeFormProps): props is SchemePostFormProps {
    return props.typeOfMethod === "post";
}

export function useSchemeForm(props: SchemeFormProps) {
    const {closeModal} = props;
    const [schemeImage, setSchemeImage] = useState<File | null>(null);
    const [schemeDescriptionImage, setSchemeDescriptionImage] =
        useState<File | null>(null);
    const schemeFileInputRef = useRef<HTMLInputElement>(null);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setSchemeImage(null);
        setSchemeDescriptionImage(null);
        closeModal();
        queryClient.invalidateQueries();
        if (schemeFileInputRef.current) schemeFileInputRef.current.value = "";
        if (descriptionFileInputRef.current)
            descriptionFileInputRef.current.value = "";
    };

    const mutation = useMutation({
        mutationFn: ({formData, schemeId}: { formData: FormData; schemeId?: number }) => {
            if (isPostProps(props)) {
                return adminApi.uploadScheme(formData);
            } else {
                if (!schemeId) {
                    throw new Error("schemeId is required for patch operation");
                }
                return adminApi.updateScheme(schemeId, formData);
            }
        },
        onSuccess: () => {
            resetForm();

            queue.add({
                title: 'Схемы клинического случая успешно добавлены/обновлены',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            const errorMessage = isPostProps(props)
                ? "Ошибка при добавлении схем"
                : "Ошибка при обновлении схем";

            console.error(errorMessage, error);

            queue.add({
                title: `${errorMessage}`,
                type: 'error'
            }, {
                timeout: 3000
            });

        },
    });

    const handleSubmit = (e: React.FormEvent, schemeId?: number) => {
        e.preventDefault();

        if (!schemeImage || !schemeDescriptionImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();

        if (isPostProps(props)) {
            formData.append("case", props.caseId.toString());
        }

        formData.append("scheme_img", schemeImage);
        formData.append("scheme_description_img", schemeDescriptionImage);

        mutation.mutate({formData, schemeId});
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