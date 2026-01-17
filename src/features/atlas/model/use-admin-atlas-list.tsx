import {useDeletePathologyMutationQuery, useDeleteTutorialMutationQuery} from "@/entities/admin";

export function useAdminAtlasList() {
    // ========== Состояние модалок редактирования ==========


    // ========== Запрос данных ==========
    const useDeletePathologyMutation = useDeletePathologyMutationQuery();
    const useDeleteTutorialMutation = useDeleteTutorialMutationQuery();

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

    /**
     * Мутация удаления туториала
     * @param id - ID туториала
     */
    const handleDeleteTutorial = (id: number) => {
        if (window.confirm("Вы уверены, что хотите удалить этот туториал?")) {
            useDeleteTutorialMutation.mutate(id);
        }
    }


    return {
        handleDeletePathology,
        handleDeleteTutorial,
    };
}