import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi, PathologyCreateDto} from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

interface Pathology {
    id: number
    name: string
    description: string
}

export function useAddPathologyForm({ closeModal }: { closeModal: () => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Omit<Pathology, "id">>();

    const mutation = useMutation({
        mutationFn: (data: PathologyCreateDto) => adminApi.createPathology(data),
        onSuccess: () => {
            queryClient.invalidateQueries();
            reset();
            closeModal();

            queue.add({
                title: 'Патология добавлена',
                description: 'Патология успешно добавлены в систему',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            console.error("Ошибка при добавлении патологии:", error);

            queue.add({
                title: 'Патология не была добавлена',
                description: `Ошибка при добавлении патологии: ${error}`,
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });

    const onSubmit = (data: Omit<Pathology, "id">) => {
        mutation.mutate(data);
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        mutation,
    }
}