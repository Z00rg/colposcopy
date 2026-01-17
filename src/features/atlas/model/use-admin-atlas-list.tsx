import {useDeleteMutationQuery} from "@/entities/admin";

export function useAdminAtlasList() {

    // ========== Запрос данных ==========
    const useDeleteMutation = useDeleteMutationQuery();

    // ========== Обработчики ==========
    /**
     * Мутация удаления патологии
     * @param id - ID патологии
     */
    const handleDelete = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить эту патологию?")) {
            useDeleteMutation.mutate(id);
        }
    };

    return {
        handleDeletePathology: handleDelete,
    };
}