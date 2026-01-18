import {usePathologyQuery} from "@/entities/pathology";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";

export type UseEditPathologyFormProps = {
    pathologyId: number,
    closeModal: () => void,
};

export function useEditPathologyForm ({ pathologyId, closeModal }: UseEditPathologyFormProps) {
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
            adminApi.updatePathologyText(id, data),
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

    return {
        handleSubmit,
        newDescription,
        setNewDescription,
        updateMutation,
    }
}