"use client";

import {useState, useRef} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiInstance} from "@/shared/api/api-instance";
import {casesApi as clinicalCasesApi} from "@/shared/api/casesApi";
import Head from "next/head";
import {Tabs, TabList, Tab, TabPanels, TabPanel} from "@/shared/ui/Tabs";
import {AtlasList} from "@/features/atlas";
import {ClinicalCasesList} from "@/features/clinical-case/ui/clinical-cases-list";

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
                        </div>
                    </TabPanel>
                    <TabPanel id="cases" className="flex items-center justify-center">
                        <div className="w-full flex flex-col">
                            <ClinicalCasesList adminList className="mb-6"/>
                            <LayerForm/>
                            <SchemeForm/>
                        </div>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
}
