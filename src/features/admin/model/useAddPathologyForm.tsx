import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {adminApi, PathologyCreateDto} from "@/shared/api/adminApi";

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
        },
        onError: (error) => {
            console.error("Ошибка при добавлении патологии:", error);
            alert("Ошибка при добавлении патологии");
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