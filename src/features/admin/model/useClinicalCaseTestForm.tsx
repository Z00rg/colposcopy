import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/query-client";
import { adminApi } from "@/shared/api/adminApi";

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

    // Запрос существующих вопросов (только для PATCH)
    const getQuestionsQuery = useQuery({
        queryKey: ["admin-questions", !isPostProps(props) ? props.caseId : null],
        queryFn: async () => {
            if (!isPostProps(props)) {
                return await adminApi.getQuestions(props.caseId);
            }
            throw new Error("Не может быть назначе в create модельке");
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

    // Единая мутация
    const mutation = useMutation({
        mutationFn: async (data: ClinicalCaseCreate | { questions: QuestionUpdate[] }) => {
            if (isPostProps(props)) {
                return await adminApi.createClinicalCase(data as ClinicalCaseCreate);
            } else {
                return await adminApi.updateQuestions(props.caseId, data);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            closeModal();
            reset();
        },
        onError: (error) => {
            const errorMessage = isPostProps(props)
                ? "Ошибка при добавлении клинического случая"
                : "Ошибка при обновлении теста";
            console.error(errorMessage, error);
            alert(errorMessage);
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
            updatedQuestions[questionIndex].answers[answerIndex].is_correct =
                !updatedQuestions[questionIndex].answers[answerIndex].is_correct;
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
            // Для PATCH отправляем объект с полем questions
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
        mutation,
        isLoadingQuestions: getQuestionsQuery.isLoading,
        isErrorLoadingQuestions: getQuestionsQuery.isError,
    };
}