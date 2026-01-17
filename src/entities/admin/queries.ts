import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";


export function useDeletePathologyMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deletePathology(id),
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