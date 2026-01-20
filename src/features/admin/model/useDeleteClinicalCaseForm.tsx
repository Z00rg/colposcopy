import {useMutation} from "@tanstack/react-query";
import {adminApi} from "@/shared/api/adminApi";
import {queryClient} from "@/shared/api/query-client";

export function useDeleteClinicalCase() {

    const deleteMutation = useMutation({
        mutationFn: (id: number) => adminApi.deleteClinicalCase(id),
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
        onError: (error) => {
            console.error("Ошибка при удалении клинического случая:", error);
            alert("Ошибка при удалении клинического случая");
        },
    });

    // ========== Обработчики ==========
    /**
     * Мутация удаления кейса
     * @param id - ID кейса
     */
    const handleDeleteClinicalCase = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот клинический случай?")) {
            deleteMutation.mutate(id);
        }
    };

    return {
        handleDeleteClinicalCase,
    }
}