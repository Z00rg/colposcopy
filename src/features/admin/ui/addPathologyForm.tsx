import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {apiInstance} from "@/shared/api/api-instance";
import {Button} from "@/shared/ui/Button";

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

export function AddPathologyForm ({ closeModal }: { closeModal: () => void }) {
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

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить патологию</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Название патологии
                    </label>
                    <input
                        {...register("name", {required: "Название обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите название патологии"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание патологии
                    </label>
                    <textarea
                        {...register("description", {required: "Описание обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите описание патологии"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="flex w-full justify-end gap-3">
                    {/* react-aria cancel */}
                    <Button
                        slot="close"
                        variant="secondary"
                        isDisabled={mutation.isPending}
                    >
                        Отмена
                    </Button>

                    {/* submit НЕ закрывает */}
                    <Button
                        type="submit"
                        isPending={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        Добавить патологию
                    </Button>
                </div>

            </form>
        </div>
    );
}