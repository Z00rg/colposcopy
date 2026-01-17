import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {apiInstance} from "@/shared/api/api-instance";

interface Pathology {
    id: number
    name: string
    description: string
}

const createPathology = (data: Omit<Pathology, "id">) => {
    return apiInstance
        .post("/pathologies/", data)
        .then((response) => response.data);
};

export function useAddPathologyForm({ closeModal }: { closeModal: () => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Omit<Pathology, "id">>();

    const mutation = useMutation({
        mutationFn: createPathology,
        onSuccess: () => {
            queryClient.invalidateQueries();
            alert("Патология успешно добавлена");
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