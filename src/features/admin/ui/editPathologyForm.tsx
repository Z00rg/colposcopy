import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";

const updatePathology = (id: number, data: { description: string }) => {
    return apiInstance
        .patch(`/pathologies/${id}/`, data)
        .then((response) => response.data);
};

export function EditPathologyForm (pathologyId: number) {
    const [newDescription, setNewDescription] = useState("");

    const updateMutation = useMutation({
        mutationFn: ({id, data}: { id: number; data: { description: string } }) =>
            updatePathology(id, data),
        onSuccess: () => {
            alert("Патология успешно обновлена");
            setNewDescription("");
        },
        onError: (error) => {
            console.error("Ошибка при обновлении патологии:", error);
            alert("Ошибка при обновлении патологии");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pathologyId || !newDescription) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        updateMutation.mutate({
            id: pathologyId,
            data: {description: newDescription},
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">
                Редактировать/удалить патологию
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Новое описание
                    </label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите новое описание патологии"
                        rows={4}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {updateMutation.isPending ? "Обновление..." : "Обновить патологию"}
                    </button>
                </div>
            </form>
        </div>
    );
};