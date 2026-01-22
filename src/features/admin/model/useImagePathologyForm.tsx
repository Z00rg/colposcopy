import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";

export type UseImagePathologyFormProps = {
    pathologyOrImageId: number,
    closeModal: () => void,
    typeOfMethod: "post" | "patch",
};

export function useImagePathologyForm({
                                          pathologyOrImageId,
                                          closeModal,
                                          typeOfMethod
                                      }: UseImagePathologyFormProps) {
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: (formData: FormData) => {
            {
                return typeOfMethod === "post"
                    ? adminApi.uploadPathologyImage(formData)
                    : adminApi.editPathologyImage(pathologyOrImageId, formData);
            }
        },
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

        if (!pathologyOrImageId || !image) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const formData = new FormData();
        if (typeOfMethod === "post") {
            formData.append("pathology", pathologyOrImageId.toString())
        }
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