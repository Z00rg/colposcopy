"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {adminApi, TutorialCreateDto} from "@/shared/api/adminApi";

// DTO
interface TutorialFormData {
    name: string;
    description: string;
    video?: FileList;
    poster?: FileList;
    tutorial_file?: FileList;
}

export function useAddTutorialForm({ closeModal }: { closeModal: () => void }) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<TutorialFormData>();

    // Отслеживаем выбранные файлы для превью
    // eslint-disable-next-line react-hooks/incompatible-library
    const videoFile = watch("video");
    const posterFile = watch("poster");
    const tutorialFile = watch("tutorial_file");

    const mutation = useMutation({
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

        mutation.mutate(payload);
    };

    return {
        mutation,
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        videoFile,
        posterFile,
        tutorialFile,
    }
}