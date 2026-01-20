import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {adminApi} from "@/shared/api/adminApi";
import {queryClient} from "@/shared/api/query-client";

export type UseAddLayerFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function useAddLayerForm({caseId, closeModal}: UseAddLayerFormProps) {
    const [number, setNumber] = useState("");
    const [layerImage, setLayerImage] = useState<File | null>(null);
    const [layerDescription, setLayerDescription] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: (data: FormData) => adminApi.uploadLayer(data),
        onSuccess: () => {
            setNumber("");
            setLayerImage(null);
            setLayerDescription("");
            queryClient.invalidateQueries();
            closeModal();
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении слоя:", error);
            alert("Ошибка при добавлении слоя");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseId || !number || !layerImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();
        formData.append("case", caseId.toString());
        formData.append("number", number);
        formData.append("layer_img", layerImage);
        formData.append("layer_description", layerDescription);

        mutation.mutate(formData);
    };

    return {
        handleSubmit,
        number,
        fileInputRef,
        setNumber,
        setLayerImage,
        layerDescription,
        setLayerDescription,
        mutation,
    }
}