import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {adminApi} from "@/shared/api/adminApi";
import {queryClient} from "@/shared/api/query-client";

export type UseLayerPostFormProps = {
    caseId: number,
    closeModal: () => void,
    typeOfMethod: "post";
};

export type UseLayerPatchFormProps = {
    closeModal: () => void,
    typeOfMethod: "patch";
}

type UseLayerFormProps = UseLayerPostFormProps | UseLayerPatchFormProps;

function isPostProps(props: UseLayerFormProps): props is UseLayerPostFormProps {
    return props.typeOfMethod === "post";
}

export function useLayerForm(props: UseLayerFormProps) {
    const { closeModal } = props;
    const [number, setNumber] = useState("");
    const [layerImage, setLayerImage] = useState<File | null>(null);
    const [layerDescription, setLayerDescription] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setNumber("");
        setLayerImage(null);
        setLayerDescription("");
        queryClient.invalidateQueries();
        closeModal();
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Единая мутация, принимает layerId как параметр
    const mutation = useMutation({
        mutationFn: ({ formData, layerId }: { formData: FormData; layerId?: number }) => {
            if (isPostProps(props)) {
                return adminApi.uploadLayer(formData);
            } else {
                if (!layerId) {
                    throw new Error("layerId is required for patch operation");
                }
                return adminApi.updateLayer(layerId, formData);
            }
        },
        onSuccess: resetForm,
        onError: (error) => {
            const errorMessage = isPostProps(props)
                ? "Ошибка при добавлении слоя"
                : "Ошибка при обновлении слоя";
            console.error(errorMessage, error);
            alert(errorMessage);
        },
    });

    const handleSubmit = (e: React.FormEvent, layerId?: number) => {
        e.preventDefault();

        if (!number || !layerImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();

        if (isPostProps(props)) {
            formData.append("case", props.caseId.toString());
            formData.append("number", number);
        }

        formData.append("layer_img", layerImage);
        formData.append("layer_description", layerDescription);

        mutation.mutate({ formData, layerId });
    };

    return {
        mutation,
        handleSubmit,
        number,
        fileInputRef,
        setNumber,
        setLayerImage,
        layerDescription,
        setLayerDescription,
    }
}