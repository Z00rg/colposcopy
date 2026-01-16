"use client";

import {useState, useRef} from "react";
import {useForm} from "react-hook-form";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";
import {atlasApi} from "@/shared/api/atlasApi";
import {casesApi as clinicalCasesApi} from "@/shared/api/casesApi";
import {tests} from "@/shared/constants/layoutsJSON";
import Head from "next/head";
import {TutorialForm} from "@/features/admin";
import {Tabs, TabList, Tab, TabPanels, TabPanel} from "@/shared/ui/Tabs";
import {AtlasList} from "@/features/atlas";
import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";
import {queryClient} from "@/shared/api/query-client";

// Типы данных
interface Pathology {
    id: number;
    name: string;
    description: string;
}

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

// interface PathologyImage {
//   pathology: number;
//   image: File;
// }

// API функции
const createPathology = (data: Omit<Pathology, "id">) => {
    return apiInstance
        .post("/pathologies/", data)
        .then((response) => response.data);
};

// API функции для редактирования/удаления патологии
const updatePathology = (id: number, data: { description: string }) => {
    return apiInstance
        .patch(`/pathologies/${id}/`, data)
        .then((response) => response.data);
};

const deletePathology = (id: number) => {
    return apiInstance
        .delete(`/pathologies/${id}/`)
        .then((response) => response.data);
};

const uploadPathologyImage = (data: FormData) => {
    return apiInstance
        .post("/pathology-images/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

const createClinicalCase = (data: ClinicalCase) => {
    return apiInstance
        .post("/case_submit/", data)
        .then((response) => response.data);
};

// API функции для редактирования/удаления клинических случаев
const updateClinicalCase = (id: number, data: { name: string }) => {
    return apiInstance
        .patch(`/case_submit/${id}/`, data)
        .then((response) => response.data);
};

const deleteClinicalCase = (id: number) => {
    return apiInstance
        .delete(`/case_submit/${id}/`)
        .then((response) => response.data);
};

const uploadLayer = (data: FormData) => {
    return apiInstance
        .post("/layers/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

const uploadScheme = (data: FormData) => {
    return apiInstance
        .post("/schemes/", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

// Компонент для выбора патологии из выпадающего списка
const PathologySelector = ({
                               value,
                               onChange,
                               error,
                               label = "ID патологии",
                               required = false,
                           }: {
    value: string | number;
    onChange: (value: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    label?: string;
    required?: boolean;
}) => {
    const {
        data: pathologyList,
        isLoading,
        error: fetchError,
    } = useQuery({
        queryKey: ["admin-pathology-list"],
        queryFn: () => atlasApi.getAdminAtlasList().then((res) => res.items),
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 минут
    });

    if (isLoading) return <div className="text-sm">Загрузка патологий...</div>;
    if (fetchError)
        return (
            <div className="text-red-500 text-sm">Ошибка загрузки патологий</div>
        );

    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            >
                <option value="">Выберите патологию</option>
                {pathologyList?.map((pathology) => (
                    <option key={pathology.id} value={pathology.id}>
                        {pathology.name} (ID: {pathology.id})
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

// Компонент для выбора клинического случая из выпадающего списка
const ClinicalCaseSelector = ({
                                  value,
                                  onChange,
                                  error,
                                  label = "ID клинического случая",
                                  required = false,
                              }: {
    value: string | number;
    onChange: (value: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;
    label?: string;
    required?: boolean;
}) => {
    const {
        data: clinicalCaseList,
        isLoading,
        error: fetchError,
    } = useQuery({
        queryKey: ["clinical-case-list"],
        queryFn: () => clinicalCasesApi.getCaseList().then((res) => res.items),
        retry: 1,
        staleTime: 5 * 60 * 1000, // 5 минут
    });

    if (isLoading)
        return <div className="text-sm">Загрузка клинических случаев...</div>;
    if (fetchError)
        return (
            <div className="text-red-500 text-sm">
                Ошибка загрузки клинических случаев
            </div>
        );

    return (
        <div>
            <label className="block text-sm font-medium mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
            >
                <option value="">Выберите клинический случай</option>
                {clinicalCaseList?.map((clinicalCase) =>
                    clinicalCase.cases.map((item) => (
                        <option key={item.id} value={item.id}>
                            {clinicalCase.name} (ID паталогии: {clinicalCase.id}) Случай{" "}
                            {item.name}
                        </option>
                    ))
                )}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

// Компоненты форм
const PathologyForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<Omit<Pathology, "id">>();

    const mutation = useMutation({
        mutationFn: createPathology,
        onSuccess: () => {
            queryClient.invalidateQueries();
            alert("Патология успешно добавлена");
            reset();
        },
        onError: (error) => {
            console.error("Ошибка при добавлении патологии:", error);
            alert("Ошибка при добавлении патологии");
        },
    });

    const onSubmit = (data: Omit<Pathology, "id">) => {
        mutation.mutate(data);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 w-full">
            <h3 className="text-xl font-bold mb-4">Добавить патологию</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Название патологии
                    </label>
                    <input
                        {...register("name", {required: "Название обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите название патологии"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание патологии
                    </label>
                    <textarea
                        {...register("description", {required: "Описание обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите описание патологии"
                        rows={4}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Отправка..." : "Добавить патологию"}
                </button>
            </form>
        </div>
    );
};

const PathologyImageForm = () => {
    const [pathologyId, setPathologyId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadPathologyImage,
        onSuccess: () => {
            alert("Изображение патологии успешно добавлено");
            setPathologyId("");
            setImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении изображения патологии:", error);
            alert("Ошибка при добавлении изображения патологии");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pathologyId || !image) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        const formData = new FormData();
        formData.append("pathology", pathologyId);
        formData.append("image", image);

        mutation.mutate(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Добавить изображение патологии</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PathologySelector
                    value={pathologyId}
                    onChange={setPathologyId}
                    label="Патология"
                    required={true}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">Изображение</label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Отправка..." : "Добавить изображение"}
                </button>
            </form>
        </div>
    );
};

const ClinicalCaseForm = () => {
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
        mutationFn: createClinicalCase,
        onSuccess: () => {
            alert("Клинический случай успешно добавлен");
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
        mutation.mutate(data);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Добавить клинический случай</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Название клинического случая
                    </label>
                    <input
                        {...register("name", {required: "Название обязательно"})}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите название клинического случая"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                <PathologySelector
                    value={watch("pathology") || ""}
                    onChange={(value) => setValue("pathology", parseInt(value))}
                    label="Патология"
                    required={true}
                    error={errors.pathology}
                />

                <div className="border-t pt-4">
                    <div className="flex flex-col items-start gap-4 mb-2">
                        <div className="flex gap-2">
                            <h4 className="font-medium">Вопросы</h4>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Добавить вопрос
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <select
                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                value={selectedLayout}
                                onChange={(e) => setSelectedLayout(e.target.value)}
                            >
                                <option value="">Выберите макет</option>
                                {Object.keys(tests)
                                    .sort((a, b) => a.localeCompare(b, 'ru'))
                                    .map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))
                                }
                            </select>
                            <button
                                type="button"
                                onClick={() => {
                                    if (selectedLayout && selectedLayout in tests) {
                                        setValue("questions", tests[selectedLayout as keyof typeof tests].questions.map(q => ({
                                            ...q,
                                            qtype: q.qtype as "single" | "multiple"
                                        })));
                                    }
                                }}
                                className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Добавить макет
                            </button>
                        </div>
                    </div>

                    {questions.map((question, qIndex) => (
                        <div key={qIndex} className="border rounded p-4 mb-4 bg-gray-50">
                            <div className="flex justify-between items-center mb-2">
                                <h5 className="font-medium">Вопрос {qIndex + 1}</h5>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                >
                                    Удалить
                                </button>
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Название вопроса
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.name` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                    placeholder="Введите название вопроса"
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1">
                                    Инструкция
                                </label>
                                <input
                                    {...register(`questions.${qIndex}.instruction` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                    placeholder="Введите инструкцию"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-sm font-medium mb-1">
                                    Тип вопроса
                                </label>
                                <select
                                    {...register(`questions.${qIndex}.qtype` as const, {
                                        required: true,
                                    })}
                                    className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                                >
                                    <option value="single">Один ответ</option>
                                    <option value="multiple">Несколько ответов</option>
                                </select>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h6 className="font-medium text-sm">Ответы</h6>
                                    <button
                                        type="button"
                                        onClick={() => addAnswer(qIndex)}
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        Добавить ответ
                                    </button>
                                </div>

                                {question.answers?.map((answer, aIndex) => (
                                    <div key={aIndex} className="flex items-center mb-2 gap-2">
                                        <input
                                            type="text"
                                            value={answer.text}
                                            onChange={(e) =>
                                                updateAnswerText(qIndex, aIndex, e.target.value)
                                            }
                                            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                                            placeholder="Текст ответа"
                                        />
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={answer.is_correct}
                                                    onChange={() => toggleAnswerCorrect(qIndex, aIndex)}
                                                    className="mr-1"
                                                />
                                                Правильный
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                                className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Отправка..." : "Добавить клинический случай"}
                </button>
            </form>
        </div>
    );
};

const LayerForm = () => {
    const [caseId, setCaseId] = useState("");
    const [number, setNumber] = useState("");
    const [layerImage, setLayerImage] = useState<File | null>(null);
    const [layerDescription, setLayerDescription] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadLayer,
        onSuccess: () => {
            alert("Слой успешно добавлен");
            setCaseId("");
            setNumber("");
            setLayerImage(null);
            setLayerDescription("");
            if (fileInputRef.current) fileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении слоя:", error);
            alert("Ошибка при добавлении слоя");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseId || !number || !layerImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();
        formData.append("case", caseId);
        formData.append("number", number);
        formData.append("layer_img", layerImage);
        formData.append("layer_description", layerDescription);

        mutation.mutate(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Добавить слой</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ClinicalCaseSelector
                    value={caseId}
                    onChange={setCaseId}
                    label="Клинический случай"
                    required={true}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">Номер слоя</label>
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите номер слоя"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение слоя
                    </label>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => setLayerImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Описание слоя
                    </label>
                    <textarea
                        value={layerDescription}
                        onChange={(e) => setLayerDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите описание слоя"
                        rows={3}
                    />
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Отправка..." : "Добавить слой"}
                </button>
            </form>
        </div>
    );
};

const SchemeForm = () => {
    const [caseId, setCaseId] = useState("");
    const [schemeImage, setSchemeImage] = useState<File | null>(null);
    const [schemeDescriptionImage, setSchemeDescriptionImage] =
        useState<File | null>(null);
    const schemeFileInputRef = useRef<HTMLInputElement>(null);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);

    const mutation = useMutation({
        mutationFn: uploadScheme,
        onSuccess: () => {
            alert("Схема успешно добавлена");
            setCaseId("");
            setSchemeImage(null);
            setSchemeDescriptionImage(null);
            if (schemeFileInputRef.current) schemeFileInputRef.current.value = "";
            if (descriptionFileInputRef.current)
                descriptionFileInputRef.current.value = "";
        },
        onError: (error) => {
            console.error("Ошибка при добавлении схемы:", error);
            alert("Ошибка при добавлении схемы");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseId || !schemeImage || !schemeDescriptionImage) {
            alert("Пожалуйста, заполните все обязательные поля");
            return;
        }

        const formData = new FormData();
        formData.append("case", caseId);
        formData.append("scheme_img", schemeImage);
        formData.append("scheme_description_img", schemeDescriptionImage);

        mutation.mutate(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">Добавить схему</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ClinicalCaseSelector
                    value={caseId}
                    onChange={setCaseId}
                    label="Клинический случай"
                    required={true}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение схемы
                    </label>
                    <input
                        type="file"
                        ref={schemeFileInputRef}
                        onChange={(e) => setSchemeImage(e.target.files?.[0] || null)}
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Изображение описания схемы
                    </label>
                    <input
                        type="file"
                        ref={descriptionFileInputRef}
                        onChange={(e) =>
                            setSchemeDescriptionImage(e.target.files?.[0] || null)
                        }
                        accept="image/*"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    {mutation.isPending ? "Отправка..." : "Добавить схему"}
                </button>
            </form>
        </div>
    );
};

// Компонент для редактирования и удаления патологии
const EditPathologyForm = () => {
    const [pathologyId, setPathologyId] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const updateMutation = useMutation({
        mutationFn: ({id, data}: { id: number; data: { description: string } }) =>
            updatePathology(id, data),
        onSuccess: () => {
            alert("Патология успешно обновлена");
            setPathologyId("");
            setNewDescription("");
        },
        onError: (error) => {
            console.error("Ошибка при обновлении патологии:", error);
            alert("Ошибка при обновлении патологии");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deletePathology(id),
        onSuccess: () => {
            alert("Патология успешно удалена");
            setPathologyId("");
        },
        onError: (error) => {
            console.error("Ошибка при удалении патологии:", error);
            alert("Ошибка при удалении патологии");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pathologyId || !newDescription) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        updateMutation.mutate({
            id: parseInt(pathologyId),
            data: {description: newDescription},
        });
    };

    const handleDelete = () => {
        if (!pathologyId) {
            alert("Пожалуйста, выберите патологию для удаления");
            return;
        }

        if (window.confirm("Вы уверены, что хотите удалить эту патологию?")) {
            deleteMutation.mutate(parseInt(pathologyId));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">
                Редактировать/удалить патологию
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <PathologySelector
                    value={pathologyId}
                    onChange={setPathologyId}
                    label="Патология для редактирования"
                    required={true}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Новое описание
                    </label>
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите новое описание патологии"
                        rows={4}
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {updateMutation.isPending ? "Обновление..." : "Обновить патологию"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                        {deleteMutation.isPending ? "Удаление..." : "Удалить патологию"}
                    </button>
                </div>
            </form>
        </div>
    );
};

// Компонент для редактирования и удаления клинического случая
const EditClinicalCaseForm = () => {
    const [caseId, setCaseId] = useState("");
    const [newName, setNewName] = useState("");

    const updateMutation = useMutation({
        mutationFn: ({id, data}: { id: number; data: { name: string } }) =>
            updateClinicalCase(id, data),
        onSuccess: () => {
            alert("Клинический случай успешно обновлен");
            setCaseId("");
            setNewName("");
        },
        onError: (error) => {
            console.error("Ошибка при обновлении клинического случая:", error);
            alert("Ошибка при обновлении клинического случая");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteClinicalCase(id),
        onSuccess: () => {
            alert("Клинический случай успешно удален");
            setCaseId("");
        },
        onError: (error) => {
            console.error("Ошибка при удалении клинического случая:", error);
            alert("Ошибка при удалении клинического случая");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!caseId || !newName) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        updateMutation.mutate({id: parseInt(caseId), data: {name: newName}});
    };

    const handleDelete = () => {
        if (!caseId) {
            alert("Пожалуйста, выберите клинический случай для удаления");
            return;
        }

        if (
            window.confirm("Вы уверены, что хотите удалить этот клинический случай?")
        ) {
            deleteMutation.mutate(parseInt(caseId));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold mb-4">
                Редактировать/удалить клинический случай
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <ClinicalCaseSelector
                    value={caseId}
                    onChange={setCaseId}
                    label="Клинический случай для редактирования"
                    required={true}
                />

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Новое название
                    </label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Введите новое название клинического случая"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                        {updateMutation.isPending
                            ? "Обновление..."
                            : "Обновить клинический случай"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                    >
                        {deleteMutation.isPending
                            ? "Удаление..."
                            : "Удалить клинический случай"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default function AdminHomePage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Head>
                <title>Админ-панель</title>
            </Head>
            <h1 className="text-3xl font-bold mb-8 text-center">Админ-панель</h1>
            <Tabs>
                <TabList aria-label="Tabs">
                    <Tab id="pathhology">Атлас</Tab>
                    <Tab id="cases">Клинические кейсы</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel id="pathhology" className="flex items-center justify-center">
                        <div className="w-full flex flex-col">
                            <AtlasList className="mb-6" adminList/>
                            <PathologyForm/>
                            <PathologyImageForm/>
                            <EditPathologyForm/>
                            <TutorialForm/>
                        </div>
                    </TabPanel>
                    <TabPanel id="cases" className="flex items-center justify-center">
                        <div className="w-full flex flex-col">
                            <ClinicalCasesList className="mb-6"/>
                            <ClinicalCaseForm/>
                            <LayerForm/>
                            <SchemeForm/>
                            <EditClinicalCaseForm/>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
