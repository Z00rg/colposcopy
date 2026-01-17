import {createInstance, RequestOptions} from "./api-instance";

// DTO

export interface PathologyCreateDto {
    name: string;
    description: string;
}

// DTO
export interface TutorialCreateDto {
    name: string;
    description: string;
    video?: File;
    poster?: File;
    tutorial_file?: File;
}


// API Патологий
// Добавление патологии
export const createPathology = (
    body: PathologyCreateDto,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: "/pathologies/",
            method: "POST",
            data: body,
        },
        options
    );

// Удаление патологии
export const deletePathology = (
    id: number,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/pathologies/${id}/`,
            method: "DELETE",
        },
        options
    );

// API Туториалов
// Добавление туториала
export const createTutorial = (
    body: TutorialCreateDto,
    options?: RequestOptions
) => {
    const formData = new FormData();

    formData.append("name", body.name);
    formData.append("description", body.description);

    if (body.video) {
        formData.append("video", body.video);
    }

    if (body.poster) {
        formData.append("poster", body.poster);
    }

    if (body.tutorial_file) {
        formData.append("tutorial_file", body.tutorial_file);
    }

    return createInstance<void>(
        {
            url: "tutorial/create/",
            method: "POST",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );
};

// Удаление туториала
export const deleteTutorial = (
    id: number,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `tutorial/delete/${id}/`,
            method: "DELETE",
        },
        options
    );

export const adminApi = {
    createPathology,
    deletePathology,
    createTutorial,
    deleteTutorial,
};
