"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/shared/api/api-instance";
import {useTutorialsListQuery} from "@/entities/tutorials";

// Типы
interface TutorialFormData {
    name: string;
    description: string;
    video?: FileList;
    poster?: FileList;
    tutorial_file?: FileList;
}

interface TutorialCreatePayload {
    name: string;
    description: string;
    video?: File;
    poster?: File;
    tutorial_file?: File;
}

// API функции
const createTutorial = async (data: TutorialCreatePayload) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.video) {
        formData.append("video", data.video);
    }

    if (data.poster) {
        formData.append("poster", data.poster);
    }

    if (data.tutorial_file) {
        formData.append("tutorial_file", data.tutorial_file);
    }

    return apiInstance
        .post("tutorial/create/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

const deleteTutorial = async (id: number) => {
    return apiInstance
        .delete(`tutorial/${id}/`)
        .then((response) => response.data);
};

export const TutorialForm = () => {
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

    // Загружаем список туториалов
    const tutorialsQuery = useTutorialsListQuery();

    const createMutation = useMutation({
        mutationFn: createTutorial,
        onSuccess: () => {
            alert("Туториал успешно добавлен");
            reset();
            queryClient.invalidateQueries({ queryKey: ["tutorials"] });
        },
        onError: (error) => {
            console.error("Ошибка при добавлении туториала:", error);
            alert("Ошибка при добавлении туториала");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteTutorial,
        onSuccess: () => {
            alert("Туториал успешно удален");
            queryClient.invalidateQueries({ queryKey: ["tutorials"] });
        },
        onError: (error) => {
            console.error("Ошибка при удалении туториала:", error);
            alert("Ошибка при удалении туториала");
        },
    });

    const onSubmit = (data: TutorialFormData) => {
        const payload: TutorialCreatePayload = {
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

        createMutation.mutate(payload);
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Вы уверены, что хотите удалить туториал "${name}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    const tutorials = tutorialsQuery.data?.items ?? [];

    return (
        <div className="space-y-6">
            {/* Форма добавления */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Добавить туториал</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Название */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Название туториала <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", { required: "Название обязательно" })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Введите название туториала"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Описание */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Описание туториала <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("description", { required: "Описание обязательно" })}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="Введите описание туториала"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Видео */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Видео (необязательно)
                        </label>
                        <input
                            {...register("video", {
                                validate: {
                                    fileType: (files) => {
                                        if (!files?.[0]) return true;
                                        const file = files[0];
                                        const validTypes = ["video/mp4", "video/webm", "video/ogg"];
                                        return validTypes.includes(file.type) ||
                                            "Поддерживаются только видео форматы (mp4, webm, ogg)";
                                    },
                                    fileSize: (files) => {
                                        if (!files?.[0]) return true;
                                        const maxSize = 100 * 1024 * 1024; // 100MB
                                        return files[0].size <= maxSize ||
                                            "Размер файла не должен превышать 100MB";
                                    }
                                }
                            })}
                            type="file"
                            accept="video/*"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {videoFile?.[0] && (
                            <p className="text-sm text-gray-600 mt-1">
                                Выбран файл: {videoFile[0].name} ({(videoFile[0].size / 1024 / 1024).toFixed(2)} MB)
                            </p>
                        )}
                        {errors.video && (
                            <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
                        )}
                    </div>

                    {/* Постер */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Постер для видео (необязательно)
                        </label>
                        <input
                            {...register("poster", {
                                validate: {
                                    fileType: (files) => {
                                        if (!files?.[0]) return true;
                                        const file = files[0];
                                        const validTypes = ["image/jpeg", "image/png", "image/webp"];
                                        return validTypes.includes(file.type) ||
                                            "Поддерживаются только изображения (jpg, png, webp)";
                                    },
                                    fileSize: (files) => {
                                        if (!files?.[0]) return true;
                                        const maxSize = 5 * 1024 * 1024; // 5MB
                                        return files[0].size <= maxSize ||
                                            "Размер файла не должен превышать 5MB";
                                    }
                                }
                            })}
                            type="file"
                            accept="image/*"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {posterFile?.[0] && (
                            <p className="text-sm text-gray-600 mt-1">
                                Выбран файл: {posterFile[0].name} ({(posterFile[0].size / 1024).toFixed(2)} KB)
                            </p>
                        )}
                        {errors.poster && (
                            <p className="text-red-500 text-sm mt-1">{errors.poster.message}</p>
                        )}
                    </div>

                    {/* Файл туториала */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Дополнительный файл (PDF, DOC и т.д.)
                        </label>
                        <input
                            {...register("tutorial_file", {
                                validate: {
                                    fileSize: (files) => {
                                        if (!files?.[0]) return true;
                                        const maxSize = 20 * 1024 * 1024; // 20MB
                                        return files[0].size <= maxSize ||
                                            "Размер файла не должен превышать 20MB";
                                    }
                                }
                            })}
                            type="file"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {tutorialFile?.[0] && (
                            <p className="text-sm text-gray-600 mt-1">
                                Выбран файл: {tutorialFile[0].name} ({(tutorialFile[0].size / 1024).toFixed(2)} KB)
                            </p>
                        )}
                        {errors.tutorial_file && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.tutorial_file.message}
                            </p>
                        )}
                    </div>

                    {/* Кнопка отправки */}
                    <button
                        type="submit"
                        disabled={createMutation.isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {createMutation.isPending ? "Отправка..." : "Добавить туториал"}
                    </button>
                </form>
            </div>

            {/* Список туториалов для удаления */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Список туториалов</h3>

                {tutorialsQuery.isPending && (
                    <div className="text-gray-500">Загрузка...</div>
                )}

                {tutorialsQuery.isError && (
                    <div className="text-red-500">Ошибка загрузки туториалов</div>
                )}

                {tutorials.length === 0 && !tutorialsQuery.isPending && (
                    <div className="text-gray-500">Нет туториалов</div>
                )}

                <div className="space-y-3">
                    {tutorials.map((tutorial) => (
                        <>
                            <div
                                key={tutorial.id}
                                className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                            >
                                <div className="flex-1 min-w-0 mr-4">
                                    <h4 className="font-semibold text-gray-900 truncate">
                                        {tutorial.id}
                                    </h4>
                                    <p className="text-sm text-gray-600 truncate mt-1">
                                        {tutorial.name}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(tutorial.id, tutorial.name)}
                                disabled={deleteMutation.isPending}
                                className="flex-shrink-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Удалить
                            </button>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};