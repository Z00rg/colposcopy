import {useForm} from "react-hook-form";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {queryClient} from "@/shared/api/query-client";
import {apiInstance} from "@/shared/api/api-instance";
import {adminApi} from "@/shared/api/adminApi";

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
interface ClinicalCase {
    name: string;
    pathology: number;
    questions: Question[];
}

export type UseAddClinicalCaseFormProps = {
    pathology: number,
    closeModal: () => void,
};

export function useAddClinicalCaseForm({ pathology, closeModal }: UseAddClinicalCaseFormProps) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue,
        reset,
    } = useForm<ClinicalCase>();
    const [selectedLayout, setSelectedLayout] = useState("");
    const questions = watch("questions") || [];

    const mutation = useMutation({
        mutationFn: (data: ClinicalCase) => adminApi.createClinicalCase(data),
        onSuccess: () => {
            queryClient.invalidateQueries();
            closeModal();
            reset();
        },
        onError: (error) => {
            console.error("Ошибка при добавлении клинического случая:", error);
            alert("Ошибка при добавлении клинического случая");
        },
    });

    const addQuestion = () => {
        const newQuestion: Question = {
            name: "",
            instruction: "",
            qtype: "single",
            answers: [{text: "", is_correct: false}],
        };

        // eslint-disable-next-line react-hooks/incompatible-library
        const currentQuestions = watch("questions") || [];
        setValue("questions", [...currentQuestions, newQuestion]);
    };

    const removeQuestion = (index: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = currentQuestions.filter((_, i) => i !== index);
        setValue("questions", updatedQuestions);
    };

    const addAnswer = (questionIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];
        updatedQuestions[questionIndex].answers.push({
            text: "",
            is_correct: false,
        });
        setValue("questions", updatedQuestions);
    };

    const removeAnswer = (questionIndex: number, answerIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];
        updatedQuestions[questionIndex].answers = updatedQuestions[
            questionIndex
            ].answers.filter((_, i) => i !== answerIndex);
        setValue("questions", updatedQuestions);
    };

    const updateAnswerText = (
        questionIndex: number,
        answerIndex: number,
        text: string
    ) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];
        updatedQuestions[questionIndex].answers[answerIndex].text = text;
        setValue("questions", updatedQuestions);
    };

    const toggleAnswerCorrect = (questionIndex: number, answerIndex: number) => {
        const currentQuestions = watch("questions") || [];
        const updatedQuestions = [...currentQuestions];
        updatedQuestions[questionIndex].answers[answerIndex].is_correct =
            !updatedQuestions[questionIndex].answers[answerIndex].is_correct;
        setValue("questions", updatedQuestions);
    };

    const onSubmit = (data: ClinicalCase) => {
        const payload = {
            ...data,
            pathology: pathology,
        };
        mutation.mutate(payload);
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
    }
}