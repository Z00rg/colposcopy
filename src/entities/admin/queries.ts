import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi} from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

// Удаление патологии
export function useDeletePathologyMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deletePathology(id),
        onSuccess: () => {
            queryClient.invalidateQueries();

            queue.add({
                title: 'Патология успешно удалена',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при удалении патологии:", error);

            queue.add({
                title: 'Ошибка при удалении патологии',
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });
}

// Удаление туториала
export function useDeleteTutorialMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deleteTutorial(id),
        onSuccess: () => {
            queryClient.invalidateQueries();

            queue.add({
                title: 'Туториал успешно удален',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при удалении туториала:", error);

            queue.add({
                title: 'Ошибка при удалении туториала',
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });
}

// Удаление картинки патологии
export function useDeletePathologyImageMutationQuery() {
    return useMutation({
        mutationFn: (id: number) => adminApi.deletePathologyImage(id),
        onSuccess: () => {
            queryClient.invalidateQueries();

            queue.add({
                title: 'Изображение успешно удалено',
                type: 'success'
            }, {
                timeout: 3000
            });

        },
        onError: (error) => {
            console.error("Ошибка при удалении:", error);

            queue.add({
                title: 'Ошибка при удалении изображения',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
    });
}