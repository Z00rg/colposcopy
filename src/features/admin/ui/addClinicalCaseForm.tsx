import {tests} from "@/shared/constants/layoutsJSON";
import {Button} from "@/shared/ui/Button";
import {useAddClinicalCaseForm} from "@/features/admin/model/useAddClinicalCaseForm";

export type AddClinicalCaseFormProps = {
    pathology: number,
    closeModal: () => void,
};

export function AddClinicalCaseForm({pathology, closeModal}: AddClinicalCaseFormProps) {
    const {
        handleSubmit,
        register,
        errors,
        addQuestion,
        addAnswer,
        selectedLayout,
        setSelectedLayout,
        setValue,
        questions,
        removeAnswer,
        removeQuestion,
        updateAnswerText,
        toggleAnswerCorrect,
        mutation
    } = useAddClinicalCaseForm({pathology, closeModal});

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Добавить клинический случай</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Название клинического случая
                    </label>
                    <input
                        {...register("name", {required: "Название обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите название клинического случая"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div className="border-t pt-4">
                    <div className="flex flex-col items-start gap-4 mb-2">
                        <div className="flex gap-2">
                            <h4 className="font-medium">Вопросы</h4>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Добавить вопрос
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <select
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                value={selectedLayout}
                                onChange={(e) => setSelectedLayout(e.target.value)}
                            >
                                <option value="">Выберите макет</option>
                                {Object.keys(tests)
                                    .sort((a, b) => a.localeCompare(b, 'ru'))
                                    .map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))
                                }
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedLayout && selectedLayout in tests) {
                                        setValue("questions", tests[selectedLayout as keyof typeof tests].questions.map(q => ({
                                            ...q,
                                            qtype: q.qtype as "single" | "multiple"
                                        })));
                                    }
                                }}
                                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Добавить макет
                            </button>
                        </div>
                    </div>

                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="border rounded p-4 mb-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium">Вопрос {qIndex + 1}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                >
                                    Удалить
                                </button>
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Название вопроса
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.name` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                    placeholder="Введите название вопроса"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Инструкция
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.instruction` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                    placeholder="Введите инструкцию"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">
                                    Тип вопроса
                                </label>
                                <select
                                    {...register(`questions.${qIndex}.qtype` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                >
                                    <option value="single">Один ответ</option>
                                    <option value="multiple">Несколько ответов</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h6 className="font-medium text-sm">Ответы</h6>
                                    <button
                                        type="button"
                                        onClick={() => addAnswer(qIndex)}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Добавить ответ
                                    </button>
                                </div>

                                {question.answers?.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex items-center mb-2 gap-2">
                                        <input
                                            type="text"
                                            value={answer.text}
                                            onChange={(e) =>
                                                updateAnswerText(qIndex, aIndex, e.target.value)
                                            }
                                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                                            placeholder="Текст ответа"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={answer.is_correct}
                                                    onChange={() => toggleAnswerCorrect(qIndex, aIndex)}
                                                    className="mr-1"
                                                />
                                                Правильный
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
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
                        {mutation.isPending ? "" : "Добавить клинический случай"}
                    </Button>
                </div>
            </form>
        </div>
    );
}