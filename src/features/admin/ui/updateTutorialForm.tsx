"use client";

import {Button} from "@/shared/ui/Button";
import {useTutorialForm} from "@/features/admin/model/useTutorialForm";
import {GetTutorialInfoDto} from "@/shared/api/tutorialApi";

export function UpdateTutorialForm({closeModal, tutorialId, tutorialDetails}: {
    closeModal: () => void;
    tutorialId: number;
    tutorialDetails: GetTutorialInfoDto;
}) {
    const {mutation, register, handleSubmit, errors, tutorialFile, videoFile, posterFile, watch} = useTutorialForm({
        closeModal,
        typeOfMethod: "patch",
        tutorialId,
    });

    // Следим за значениями полей для кросс-валидации
    const watchVideo = watch?.("video");
    const watchPoster = watch?.("poster");

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Название */}
                <input
                    {...register("name", {required: false})}
                    defaultValue={tutorialDetails.name}
                    className="flex p-3 w-full items-center justify-center gap-2 mx-auto bg-white rounded-lg shadow-md"
                    placeholder="Введите новое название туториала"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}

                {/* Видео */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Видео для замены (обязательно добавлять к постеру)
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
                                },
                                requiresPoster: (files) => {
                                    // Если загружено видео, проверяем наличие постера
                                    if (files?.[0] && (!watchPoster || watchPoster.length === 0)) {
                                        return "При загрузке видео необходимо также загрузить постер";
                                    }
                                    return true;
                                }
                            }
                        })}
                        type="file"
                        accept="video/*"
                        className="w-full h-[10svh] bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
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
                        Постер видео для замены (обязательно добавлять к видео)
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
                                },
                                requiresVideo: (files) => {
                                    // Если загружен постер, проверяем наличие видео
                                    if (files?.[0] && (!watchVideo || watchVideo.length === 0)) {
                                        return "При загрузке постера необходимо также загрузить видео";
                                    }
                                    return true;
                                }
                            }
                        })}
                        type="file"
                        accept="image/*"
                        className="w-full h-[10svh] bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
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
                        Дополнительный файл для замены (PDF, DOC и т.д.)
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
                        className="w-full bg-blue-50 rounded-lg hover:shadow-md border-2 border-blue-200 hover:bg-blue-100 hover:border-blue-300 px-3 py-2"
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

                {/* Описание */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание туториала
                    </label>
                    <textarea
                        {...register("description", {required: false})}
                        defaultValue={tutorialDetails.description}
                        className="w-full h-[40svh]
                                   text-[16px] font-normal bg-white border border-gray-200 pt-3 px-4
                                   shadow-sm rounded-xl
                                   overflow-y-auto overflow-x-hidden scroll-smooth
                                   text-justify resize-none
                                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                                   placeholder:text-gray-400"
                        placeholder="Введите новое описание туториала"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="flex w-full justify-end gap-3">
                    <Button
                        onPress={() => closeModal()}
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
                        {mutation.isPending ? "" : "Редактировать туториал"}
                    </Button>
                </div>
            </form>
        </div>
    );
}