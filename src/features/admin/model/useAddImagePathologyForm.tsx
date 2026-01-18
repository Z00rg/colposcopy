import {apiInstance} from "@/shared/api/api-instance";
import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";

const uploadPathologyImage = (data: FormData) => {
    return apiInstance
        .post("/pathology-images/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export type UseAddImagePathologyFormProps = {
    pathologyId: number,
    closeModal: () => void,
};

export function useAddImagePathologyForm({ pathologyId, closeModal }: UseAddImagePathologyFormProps) {
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadPathologyImage,
        onSuccess: () => {
            queryClient.invalidateQueries();
            closeModal();
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении изображения патологии:", error);
            alert("Ошибка при добавлении изображения патологии");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pathologyId || !image) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const formData = new FormData();
        formData.append("pathology", pathologyId.toString());
        formData.append("image", image);

        mutation.mutate(formData);
    };

    return {
        mutation,
        fileInputRef,
        setImage,
        handleSubmit,
    }
}