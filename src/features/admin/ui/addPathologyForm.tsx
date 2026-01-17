import {Button} from "@/shared/ui/Button";
import {useAddPathologyForm} from "@/features/admin/model/useAddPathologyForm";

export function AddPathologyForm ({ closeModal }: { closeModal: () => void }) {


    const {register, handleSubmit, errors, mutation} = useAddPathologyForm({ closeModal });

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить патологию</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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