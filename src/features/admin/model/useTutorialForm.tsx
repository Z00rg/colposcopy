"use client";

import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {adminApi, TutorialCreateDto, TutorialUpdateDto} from "@/shared/api/adminApi";

// DTO
interface TutorialFormData {
    name: string;
    description: string;
    video?: FileList;
    poster?: FileList;
    tutorial_file?: FileList;
}

interface useTutorialFormPostProps {
    closeModal: () => void;
    typeOfMethod: "post";
}

interface useTutorialFormPatchProps {
    closeModal: () => void;
    typeOfMethod: "patch";
    tutorialId: number;
}

export function useTutorialForm(props: useTutorialFormPostProps | useTutorialFormPatchProps) {
    const { closeModal, typeOfMethod } = props;
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
    } = useForm<TutorialFormData>();

    // Отслеживаем выбранные файлы для превью
    // eslint-disable-next-line react-hooks/incompatible-library
    const videoFile = watch("video");
    const posterFile = watch("poster");
    const tutorialFile = watch("tutorial_file");

    // Mutation для создания
    const createMutation = useMutation({
        mutationFn: (data: TutorialCreateDto) => adminApi.createTutorial(data),
        onSuccess: () => {
            queryClient.invalidateQueries();
            reset();
            closeModal();
        },
        onError: (error) => {
            console.error("Ошибка при добавлении туториала:", error);
            alert("Ошибка при добавлении туториала");
        },
    });

    // Mutation для обновления
    const updateMutation = useMutation({
        mutationFn: ({id, data}: { id: number, data: TutorialUpdateDto }) =>
            adminApi.updateTutorial(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries();
            reset();
            closeModal();
        },
        onError: (error) => {
            console.error("Ошибка при обновлении туториала:", error);
            alert("Ошибка при обновлении туториала");
        },
    });

    const onSubmit = (data: TutorialFormData) => {
        const payload: TutorialCreateDto = {
            name: data.name,
            description: data.description,
        };

        if (data.video?.[0]) {
            payload.video = data.video[0];
        }

        if (data.poster?.[0]) {
            payload.poster = data.poster[0];
        }

        if (data.tutorial_file?.[0]) {
            payload.tutorial_file = data.tutorial_file[0];
        }

        if (typeOfMethod === "post") {
            createMutation.mutate(payload);
        } else if (typeOfMethod === "patch") {
            updateMutation.mutate({
                data: payload,
                id: props.tutorialId,//
            });
        }
    };

    return {
        mutation: typeOfMethod === "post" ? createMutation : updateMutation,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        videoFile,
        posterFile,
        tutorialFile,
    }
}