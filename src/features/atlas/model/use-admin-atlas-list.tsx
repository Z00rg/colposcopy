import {useDeletePathologyMutationQuery} from "@/entities/admin";

export function useAdminAtlasList() {

    // ========== Запрос данных ==========
    const useDeletePathologyMutation = useDeletePathologyMutationQuery();

    // ========== Обработчики ==========
    /**
     * Мутация удаления патологии
     * @param id - ID патологии
     */
    const handleDeletePathology = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить эту патологию?")) {
            useDeletePathologyMutation.mutate(id);
        }
    };

    return {
        handleDeletePathology,
    };
}