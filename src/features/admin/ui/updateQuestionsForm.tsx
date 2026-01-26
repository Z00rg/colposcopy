import {tests} from "@/shared/constants/layoutsJSON";
import {Button} from "@/shared/ui/Button";
import {useClinicalCaseTestForm} from "@/features/admin/model/useClinicalCaseTestForm";

export type UpdateQuestionsFormProps = {
    caseId: number;
    closeModal: () => void;
};

export function UpdateQuestionsForm({caseId, closeModal}: UpdateQuestionsFormProps) {
    const {
        handleSubmit,
        register,
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
        mutation,
        isLoadingQuestions,
        isErrorLoadingQuestions,
    } = useClinicalCaseTestForm({caseId, closeModal, typeOfMethod: "patch"});

    // Показываем загрузку
    if (isLoadingQuestions) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-gray-600">Загрузка вопросов...</p>
            </div>
        );
    }

    // Показываем ошибку
    if (isErrorLoadingQuestions) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600">Ошибка при загрузке вопросов</p>
                <Button onClick={closeModal} variant="secondary" className="mt-4">
                    Закрыть
                </Button>
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Редактировать тест</h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="border-t pt-4">
                    <div className="flex flex-col items-start gap-4 mb-2">
                        <div className="flex gap-2">
                            <h4 className="font-medium">Вопросы</h4>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
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
                                        const layoutQuestions = tests[selectedLayout as keyof typeof tests].questions.map(q => ({
                                            ...q,
                                            qtype: q.qtype as "single" | "multiple"
                                        }));
                                        setValue("questions", [...questions, ...layoutQuestions]);
                                    }
                                }}
                                className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            >
                                Добавить макет
                            </button>
                        </div>
                    </div>

                    {questions.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Вопросов пока нет. Добавьте вопрос или выберите макет.
                        </div>
                    )}

                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="border rounded p-4 mb-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium">
                                    Вопрос {qIndex + 1}
                                </h5>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
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
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600 transition-colors"
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
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {question.answers?.length === 0 && (
                                    <div className="text-sm text-gray-500 italic">
                                        Ответов пока нет. Добавьте ответ.
                                    </div>
                                )}
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
                        {mutation.isPending ? "" : "Сохранить изменения"}
                    </Button>
                </div>
            </form>
        </div>
    );
}