import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";

// Удаление патологии
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

// Удаление туториала
export function useDeleteTutorialMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deleteTutorial(id),
        onSuccess: () => {
            queryClient.invalidateQueries();
            alert("Туториал успешно удален");
        },
        onError: (error) => {
            console.error("Ошибка при удалении туториала:", error);
            alert("Ошибка при удалении туториала");
        },
    });
}

// Удаление картинки патологии
export function useDeletePathologyImageMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deletePathologyImage(id),
        onSuccess: () => {
            queryClient.invalidateQueries();
            alert("Картинка успешно удалена");
        },
        onError: (error) => {
            console.error("Ошибка при удалении:", error);
            alert("Ошибка при удалении");
        },
    });
}