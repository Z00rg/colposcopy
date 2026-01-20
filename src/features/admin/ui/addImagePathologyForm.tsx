import {Button} from "@/shared/ui/Button";
import {useAddImagePathologyForm} from "@/features/admin/model/useAddImagePathologyForm";

export type AddPathologyImageFormProps = {
    pathologyId: number,
    closeModal: () => void,
};

export function AddPathologyImageForm({ pathologyId, closeModal }: AddPathologyImageFormProps) {
    const { mutation, fileInputRef, setImage, handleSubmit } = useAddImagePathologyForm({ pathologyId, closeModal });

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить изображение патологии</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Изображение</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="flex w-full justify-end gap-3">
                    <Button
                        onClick={closeModal}
                        variant="secondary"
                        isDisabled={mutation.isPending}
                    >
                        Отмена
                    </Button>

                    <Button
                        type="submit"
                        variant="secondary"
                        isPending={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        {mutation.isPending ? "" : "Добавить изображение"}
                    </Button>
                </div>
            </form>
        </div>
    );
}