import {Button} from "@/shared/ui/Button";
import {useMutation} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {apiInstance} from "@/shared/api/api-instance";

const uploadLayer = (data: FormData) => {
    return apiInstance
        .post("/layers/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export type AddLayerFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function AddLayerForm({ caseId, closeModal }: AddLayerFormProps) {
    const [number, setNumber] = useState("");
    const [layerImage, setLayerImage] = useState<File | null>(null);
    const [layerDescription, setLayerDescription] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadLayer,
        onSuccess: () => {
            setNumber("");
            setLayerImage(null);
            setLayerDescription("");
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

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить слой</h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Номер слоя</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите номер слоя"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение слоя
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setLayerImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание слоя
                    </label>
                    <textarea
                        value={layerDescription}
                        onChange={(e) => setLayerDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите описание слоя"
                        rows={3}
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
                        {mutation.isPending ? "" : "Добавить слой"}
                    </Button>
                </div>
            </form>
        </div>
    );
}