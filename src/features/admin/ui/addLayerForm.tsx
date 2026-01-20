import {Button} from "@/shared/ui/Button";
import {useAddLayerForm} from "@/features/admin/model/useAddLayerForm";

export type AddLayerFormProps = {
    caseId: number,
    closeModal: () => void,
};

export function AddLayerForm({caseId, closeModal}: AddLayerFormProps) {
    const {
        handleSubmit,
        number,
        fileInputRef,
        setNumber,
        setLayerImage,
        layerDescription,
        setLayerDescription,
        mutation,
    } = useAddLayerForm({caseId, closeModal});

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить слой</h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium mb-1">Номер слоя</label>
                    <select
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="">Выберите номер слоя</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение слоя
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setLayerImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание слоя
                    </label>
                    <textarea
                        value={layerDescription}
                        onChange={(e) => setLayerDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите описание слоя"
                        rows={3}
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
                        isPending={mutation.isPending}
                        isDisabled={mutation.isPending}
                    >
                        {mutation.isPending ? "" : "Добавить слой"}
                    </Button>
                </div>
            </form>
        </div>
    );
}