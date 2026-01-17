import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";
import {Button} from "@/shared/ui/Button";
import {usePathologyQuery} from "@/entities/pathology";
import {queryClient} from "@/shared/api/query-client";

const updatePathology = (id: number, data: { description: string }) => {
    return apiInstance
        .patch(`/pathologies/${id}/`, data)
        .then((response) => response.data);
};

export type UiModalProps = {
    pathologyId: number,
    closeModal: () => void,
};

export function EditPathologyForm ({ pathologyId, closeModal }: UiModalProps) {
    const pathologyQuery = usePathologyQuery(pathologyId);

    const [newDescription, setNewDescription] = useState("");

    useEffect(() => {
        if (pathologyQuery.data?.description) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNewDescription(pathologyQuery.data.description);
        }
    }, [pathologyQuery.data]);

    const updateMutation = useMutation({
        mutationFn: ({id, data}: { id: number; data: { description: string } }) =>
            updatePathology(id, data),
        onSuccess: () => {
            setNewDescription("");
            queryClient.invalidateQueries();
            closeModal();
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
        <div>
            <h3 className="text-xl font-bold mb-4">
                Редактировать/удалить патологию
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание
                    </label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите новое описание патологии"
                        rows={4}
                    />
                </div>

                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="secondary"
                        isDisabled={updateMutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        isPending={updateMutation.isPending}
                        isDisabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? "" : "Обновить патологию"}
                    </Button>
                </div>
            </form>
        </div>
    );
}