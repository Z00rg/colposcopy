import {apiInstance} from "@/shared/api/api-instance";
import {useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {Button} from "@/shared/ui/Button";

export type AddPathologyImageFormProps = {
    pathologyId: number,
    closeModal: () => void,
};

const uploadPathologyImage = (data: FormData) => {
    return apiInstance
        .post("/pathology-images/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export function AddPathologyImageForm({ pathologyId, closeModal }: AddPathologyImageFormProps) {
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Добавить изображение патологии</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Изображение</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
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
                        {mutation.isPending ? "" : "Добавить изображение"}
                    </Button>
                </div>
            </form>
        </div>
    );
}