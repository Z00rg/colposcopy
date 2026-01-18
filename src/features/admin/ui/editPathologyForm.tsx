import {Button} from "@/shared/ui/Button";
import {useEditPathologyForm} from "@/features/admin/model/useEditPathologyForm";

export type EditPathologyFormProps = {
    pathologyId: number,
    closeModal: () => void,
};

export function EditPathologyForm ({ pathologyId, closeModal }: EditPathologyFormProps) {

    const { handleSubmit, newDescription, setNewDescription, updateMutation } = useEditPathologyForm({ pathologyId, closeModal });

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">
                Редактировать текст
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание
                    </label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите новое описание патологии"
                        rows={16}
                    />
                </div>

                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="secondary"
                        isDisabled={updateMutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        isPending={updateMutation.isPending}
                        isDisabled={updateMutation.isPending}
                    >
                        {updateMutation.isPending ? "" : "Обновить патологию"}
                    </Button>
                </div>
            </form>
        </div>
    );
}