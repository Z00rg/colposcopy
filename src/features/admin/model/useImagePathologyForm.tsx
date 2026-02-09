import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

export type UseImagePathologyFormProps = {
    pathologyOrImageId: number,
    closeModal: () => void,
    typeOfMethod: "post" | "patch",
};

// Кастомный хук для работы с изображениями патологии (добавление/обновление)
// Тип формочки меняется с помощью параметра typeOfMethod

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

            queue.add({
                title: 'Изображение патологии успешно обновлена',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при работе с изображениями патологии:", error);

            queue.add({
                title: 'Ошибка при работе с изображениями патологии',
                type: 'error'
            }, {
                timeout: 3000
            });
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