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
        changeQuestionType,
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
        <div className="w-full max-w-4xl relative">
            {/* Крестик для закрытия */}
            <button
                type="button"
                onClick={closeModal}
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Закрыть"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            <h3 className="text-xl font-bold mb-4 pr-8">Редактировать тест</h3>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="border-t pt-4">
                    <div className="flex flex-col items-start gap-4 mb-4">
                        <div className="flex gap-3 items-center w-full justify-between">
                            <h4 className="font-medium text-lg">Вопросы</h4>
                            <Button
                                type="button"
                                onClick={addQuestion}
                                variant="secondary"
                            >
                                Добавить вопрос
                            </Button>
                        </div>

                        <div className="flex gap-3 items-center w-full justify-between">
                            <select
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <Button
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
                                variant="secondary"
                            >
                                Добавить макет
                            </Button>
                        </div>
                    </div>

                    {questions.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            Вопросов пока нет. Добавьте вопрос или выберите макет.
                        </div>
                    )}

                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="border border-gray-200 rounded-lg p-5 mb-4 bg-white shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="font-semibold text-base">
                                    Вопрос {qIndex + 1}
                                </h5>
                                <Button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    variant="secondary"
                                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                                >
                                    Удалить
                                </Button>
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-2">
                                    Название вопроса
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.name` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Введите название вопроса"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-2">
                                    Инструкция
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.instruction` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Введите инструкцию"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Тип вопроса
                                </label>
                                <select
                                    value={question.qtype}
                                    onChange={(e) => changeQuestionType(qIndex, e.target.value as "single" | "multiple")}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="single">Один ответ</option>
                                    <option value="multiple">Несколько ответов</option>
                                </select>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-3">
                                    <h6 className="font-medium text-sm">Ответы</h6>
                                    <Button
                                        type="button"
                                        onClick={() => addAnswer(qIndex)}
                                        variant="secondary"
                                        className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
                                    >
                                        Добавить ответ
                                    </Button>
                                </div>

                                {question.answers?.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex items-start gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                                        <input
                                            type="text"
                                            value={answer.text}
                                            onChange={(e) =>
                                                updateAnswerText(qIndex, aIndex, e.target.value)
                                            }
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Текст ответа"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center text-sm whitespace-nowrap">
                                                <input
                                                    type={question.qtype === "single" ? "radio" : "checkbox"}
                                                    checked={answer.is_correct}
                                                    onChange={() => toggleAnswerCorrect(qIndex, aIndex)}
                                                    className="mr-2 w-4 h-4"
                                                    name={question.qtype === "single" ? `correct-answer-${qIndex}` : undefined}
                                                />
                                                Правильный
                                            </label>
                                            <Button
                                                type="button"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                                variant="secondary"
                                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 text-xs"
                                            >
                                                Удалить
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {question.answers?.length === 0 && (
                                    <div className="text-sm text-gray-500 italic text-center py-4 bg-gray-50 rounded-lg">
                                        Ответов пока нет. Добавьте ответ.
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex w-full justify-end gap-3 pt-4 border-t">
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