import {useMutation} from "@tanstack/react-query";
import {adminApi} from "@/shared/api/adminApi";
import {queryClient} from "@/shared/api/query-client";
import {queue} from "@/shared/ui/Toast";

// Кастомный хук для удаления клинического случая

export function useDeleteClinicalCase() {

    const deleteMutation = useMutation({
        mutationFn: (id: number) => adminApi.deleteClinicalCase(id),
        onSuccess: () => {
            queryClient.invalidateQueries();

            queue.add({
                title: 'Клинический случай успешно удален',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при удалении клинического случая:", error);

            queue.add({
                title: 'Ошибка при удалении клинического случая',
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });

    const handleDeleteClinicalCase = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот клинический случай?")) {
            deleteMutation.mutate(id);
        }
    };

    return {
        handleDeleteClinicalCase,
    }
}