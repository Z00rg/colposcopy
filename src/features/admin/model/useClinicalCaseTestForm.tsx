import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { adminApi, AdminQuestion } from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

// Типы для POST (создание)
interface Answer {
    text: string;
    is_correct: boolean;
}

interface Question {
    name: string;
    instruction: string;
    qtype: "single" | "multiple";
    answers: Answer[];
}

interface ClinicalCaseCreate {
    name: string;
    pathology: number;
    questions: Question[];
}

// Типы для PATCH (обновление)
interface AnswerUpdate {
    id?: number;
    text: string;
    is_correct: boolean;
}

interface QuestionUpdate {
    id?: number;
    name: string;
    instruction: string;
    qtype: "single" | "multiple";
    answers: AnswerUpdate[];
}

// Объединенный тип для формы
type FormData = ClinicalCaseCreate & { questions: QuestionUpdate[] };

// Пропсы для хука
export type UseClinicalCaseTestFormPostProps = {
    pathologyId: number;
    closeModal: () => void;
    typeOfMethod: "post";
};

export type UseClinicalCaseTestFormPatchProps = {
    caseId: number;
    closeModal: () => void;
    typeOfMethod: "patch";
};

type UseClinicalCaseTestFormProps =
    | UseClinicalCaseTestFormPostProps
    | UseClinicalCaseTestFormPatchProps;

// Type guard
function isPostProps(props: UseClinicalCaseTestFormProps): props is UseClinicalCaseTestFormPostProps {
    return props.typeOfMethod === "post";
}

/**
 * Универсальный хук для добавления/обновления клинических случаев
 *
 * Функциональность:
 * - Отображение данных теста прикрпеленного к клиническому случаю
 * - Редактирование теста: добавление, удаление, обновление вопросов, ответов, их типов (один ответ/множество)
 * - Логика создания нового клинического случая вмесие с тестом
 */

export function useClinicalCaseTestForm(props: UseClinicalCaseTestFormProps) {
    const { closeModal, typeOfMethod } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        reset,
    } = useForm<FormData>();

    const [selectedLayout, setSelectedLayout] = useState("");
    const questions = watch("questions") || [];

    // Запрос существующих вопросов для PATCH
    const getQuestionsQuery = useQuery({
        queryKey: ["admin-questions", !isPostProps(props) ? props.caseId : null],
        queryFn: async () => {
            if (!isPostProps(props)) {
                return await adminApi.getQuestions(props.caseId);
            }
            throw new Error("Query should not run in POST mode");
        },
        enabled: typeOfMethod === "patch",
        staleTime: 5 * 60 * 1000,
        retry: 0,
    });

    // Загружаем существующие вопросы в форму при PATCH
    useEffect(() => {
        if (typeOfMethod === "patch" && getQuestionsQuery.data?.questions) {
            setValue("questions", getQuestionsQuery.data.questions as QuestionUpdate[]);
        }
    }, [getQuestionsQuery.data, typeOfMethod, setValue]);

    // Единая мутация, управляется пропсом typeOfMethod
    const mutation = useMutation({
        mutationFn: async (data: ClinicalCaseCreate | { questions: QuestionUpdate[] }) => {
            if (isPostProps(props)) {
                return await adminApi.createClinicalCase(data as ClinicalCaseCreate);
            } else {
                return await adminApi.updateQuestions(props.caseId, data as { questions: AdminQuestion[] });
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            closeModal();
            reset();

            queue.add({
                title: 'Клинический случай добавлен/обновлен',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            const errorMessage = isPostProps(props)
                ? "Ошибка при добавлении клинического случая"
                : "Ошибка при обновлении теста";

            console.error(errorMessage, error);

            queue.add({
                title: `${errorMessage}`,
                type: 'error'
            }, {
                timeout: 3000
            });
        },
    });

    // Добавление вопроса
    const addQuestion = () => {
        const newQuestion: QuestionUpdate = {
            name: "",
            instruction: "",
            qtype: "single",
            answers: [{ text: "", is_correct: false }],
        };

        // eslint-disable-next-line react-hooks/incompatible-library
        const currentQuestions = watch("questions") || [];
        setValue("questions", [...currentQuestions, newQuestion]);
    };

    // Удаление вопроса
    const removeQuestion = (index: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = currentQuestions.filter((_, i) => i !== index);
        setValue("questions", updatedQuestions);
    };

    // Добавление ответа
    const addAnswer = (questionIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];

        if (updatedQuestions[questionIndex]) {
            updatedQuestions[questionIndex].answers.push({
                text: "",
                is_correct: false,
            });
            setValue("questions", updatedQuestions);
        }
    };

    // Удаление ответа
    const removeAnswer = (questionIndex: number, answerIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];

        if (updatedQuestions[questionIndex]) {
            updatedQuestions[questionIndex].answers = updatedQuestions[
                questionIndex
                ].answers.filter((_, i) => i !== answerIndex);
            setValue("questions", updatedQuestions);
        }
    };

    // Обновление текста ответа
    const updateAnswerText = (
        questionIndex: number,
        answerIndex: number,
        text: string
    ) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];

        if (updatedQuestions[questionIndex]?.answers[answerIndex]) {
            updatedQuestions[questionIndex].answers[answerIndex].text = text;
            setValue("questions", updatedQuestions);
        }
    };

    // Переключение правильности ответа
    const toggleAnswerCorrect = (questionIndex: number, answerIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];

        if (updatedQuestions[questionIndex]?.answers[answerIndex]) {
            const question = updatedQuestions[questionIndex];
            const currentAnswer = question.answers[answerIndex];

            // Если тип вопроса "single" и мы отмечаем ответ как правильный
            if (question.qtype === "single" && !currentAnswer.is_correct) {
                // Снимаем галочки со всех остальных ответов
                question.answers.forEach((answer, idx) => {
                    if (idx !== answerIndex) {
                        answer.is_correct = false;
                    }
                });
            }

            // Переключаем текущий ответ
            currentAnswer.is_correct = !currentAnswer.is_correct;
            setValue("questions", updatedQuestions);
        }
    };

    // Изменение типа вопроса с очисткой выбранных ответов
    const changeQuestionType = (questionIndex: number, newType: "single" | "multiple") => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];

        if (updatedQuestions[questionIndex]) {
            // Смена тип вопроса
            updatedQuestions[questionIndex].qtype = newType;

            // Сброс выделенных ранее ответов
            updatedQuestions[questionIndex].answers.forEach(answer => {
                answer.is_correct = false;
            });

            setValue("questions", updatedQuestions);
        }
    };

    // Обработчик отправки формы
    const onSubmit = (data: FormData) => {
        if (isPostProps(props)) {
            const payload: ClinicalCaseCreate = {
                name: data.name,
                pathology: props.pathologyId,
                questions: data.questions,
            };
            mutation.mutate(payload);
        } else {
            // Для PATCH – с полем questions
            const payload: { questions: QuestionUpdate[] } = {
                questions: data.questions,
            };
            mutation.mutate(payload);
        }
    };

    return {
        handleSubmit: handleSubmit(onSubmit),
        register,
        errors,
        addQuestion,
        addAnswer,
        selectedLayout,
        setSelectedLayout,
        setValue,
        questions,
        removeQuestion,
        removeAnswer,
        updateAnswerText,
        toggleAnswerCorrect,
        changeQuestionType,
        mutation,
        isLoadingQuestions: getQuestionsQuery.isLoading,
        isErrorLoadingQuestions: getQuestionsQuery.isError,
    };
}