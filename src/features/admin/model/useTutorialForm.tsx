"use client";

import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {adminApi, TutorialCreateDto, TutorialUpdateDto} from "@/shared/api/adminApi";
import {queue} from "@/shared/ui/Toast";

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

type UseTutorialFormProps = useTutorialFormPostProps | useTutorialFormPatchProps;

// Type guard
function isPatchProps(props: UseTutorialFormProps): props is useTutorialFormPatchProps {
    return props.typeOfMethod === "patch";
}

// Универсальный хук для работы с туториалами (добавление/обновление)
// Тип формочки меняется с помощью параметра typeOfMethod

export function useTutorialForm(props: UseTutorialFormProps) {
    const { closeModal } = props;
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

    // Общая функция для успешного завершения
    const handleSuccess = () => {
        queryClient.invalidateQueries();
        reset();
        closeModal();
    };

    // Единая мутация
    const mutation = useMutation({
        mutationFn: (payload: TutorialCreateDto | TutorialUpdateDto) => {
            if (isPatchProps(props)) {
                return adminApi.updateTutorial(props.tutorialId, payload);
            } else {
                return adminApi.createTutorial(payload as TutorialCreateDto);
            }
        },
        onSuccess: () => {
            handleSuccess();

            queue.add({
                title: 'Туториал успешно добавлен/обновлен',
                type: 'success'
            }, {
                timeout: 3000
            });
        },
        onError: (error) => {
            const errorMessage = isPatchProps(props)
                ? "Ошибка при обновлении туториала"
                : "Ошибка при добавлении туториала";

            console.error(errorMessage, error);

            queue.add({
                title: `${errorMessage}`,
                type: 'error'
            }, {
                timeout: 3000
            });

        },
    });

    const onSubmit = (data: TutorialFormData) => {
        const payload: TutorialCreateDto | TutorialUpdateDto = {
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
        watch,
    }
}