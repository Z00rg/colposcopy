import {createInstance, RequestOptions} from "./api-instance";

// DTO Патологий

export interface PathologyCreateDto {
    name: string;
    description: string;
}

export interface PathologyEditTextDto {
    description: string;
}

// DTO Туториалов
export interface TutorialCreateDto {
    name: string;
    description: string;
    video?: File;
    poster?: File;
    tutorial_file?: File;
}

export interface TutorialUpdateDto {
    name?: string;
    description?: string;
    video?: File;
    poster?: File;
    tutorial_file?: File;
}

// DTO Клинических кейсов
interface Answer {
    id?: number;
    text: string;
    is_correct: boolean;
}

interface Question {
    id?: number;
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

// Добавление картинки к патологии
export const uploadPathologyImage = (
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: "/pathology-images/",
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );

// Удаление картинки патологии
export const deletePathologyImage = (
    id: number,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/pathology-images/${id}/`,
            method: "DELETE",
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );

// Редактирование картинки к патологии
export const editPathologyImage = (
    id: number,
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/pathology-images/${id}/`,
            method: "PATCH",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );


// Редактирование текста патологии
export const updatePathologyText = (
    id: number,
    body: PathologyEditTextDto,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/pathologies/${id}/`,
            method: "PATCH",
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

// Редактирование видео туториала
export const updateTutorial = (
    idTutorial: number,
    body: TutorialUpdateDto,
    options?: RequestOptions
) => {
    const formData = new FormData();

    if (body.name) {
        formData.append("name", body.name);
    }

    if (body.description) {
        formData.append("description", body.description);
    }

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
            url: `tutorial/update/${idTutorial}`,
            method: "PATCH",
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

//API Клинических случаев
//Добавление клинического случая
const createClinicalCase = (body: ClinicalCase, options?: RequestOptions) =>
    createInstance<void>(
        {
            url: "/case_submit/",
            method: "POST",
            data: body,
        },
        options
    );

//Удаление клинического случая
const deleteClinicalCase = (id: number, options?: RequestOptions) =>
    createInstance<void>(
        {
            url: `/case_submit/${id}/`,
            method: "DELETE",
        },
        options
    );

//Добавление слоя к клиническому случаю
export const uploadLayer = (
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: "/layers/",
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );

//Обновление слоя к клиническому случаю
export const updateLayer = (
    idLayer: number,
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/layers/update/${idLayer}`,
            method: "PATCH",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );


// Добавление схем к клиническому случаю
export const updateScheme = (
    idScheme: number,
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/schemes/update/${idScheme}`,
            method: "PATCH",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );

// Обновление схем к клиническому случаю
export const uploadScheme = (
    data: FormData,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: "/schemes/",
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
        options
    );

// Обновление тестов к патологии
export const updateQuestions = (
    idQuestion: number,
    data: Question,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/questions/update/${idQuestion}`,
            method: "PATCH",
            data: data,
        },
        options
    );

// Получение тестов для последующего редактирования
export const getQuestions = (
    idQuestion: number,
    data: Question,
    options?: RequestOptions
) =>
    createInstance<void>(
        {
            url: `/questions/update/${idQuestion}`,
            method: "GET",
            data: data,
        },
        options
    );

export const adminApi = {
    createPathology,
    uploadPathologyImage,
    deletePathologyImage,
    editPathologyImage,
    updatePathologyText,
    deletePathology,
    createTutorial,
    updateTutorial,
    deleteTutorial,
    createClinicalCase,
    deleteClinicalCase,
    uploadLayer,
    updateLayer,
    uploadScheme,
    updateScheme,
};
