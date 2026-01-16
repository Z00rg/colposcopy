import {useMutation} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";
import {queryClient} from "@/shared/api/query-client";

const deletePathology = async (id: number) => {
    const response = await apiInstance
        .delete(`/pathologies/${id}/`);
    return response.data;
};


export function useDeleteMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => deletePathology(id),
        onSuccess: () => {
            queryClient.invalidateQueries();
            alert("Патология успешно удалена");
        },
        onError: (error) => {
            console.error("Ошибка при удалении патологии:", error);
            alert("Ошибка при удалении патологии");
        },
    });
}