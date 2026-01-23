/**
 * Адаптер для преобразования данных клинического случая из API
 * в формат, необходимый для формы редактирования
 */

// Тип данных, которые приходят с бэка
interface CaseDetailsFromAPI {
    id: number;
    descriptionContainer: string[];
    imgContainer: Array<{
        id: number;
        image: string;
    }>;
    imgSchema: {
        id: number;
        image: string;
    };
}

// Тип данных для формы редактирования
interface LayerForEdit {
    id: number;
    number: number;
    image: string;
    description: string;
}

interface SchemeForEdit {
    id: number;
    image: string;
    descriptionImage: string;
}

interface TransformedCaseData {
    caseId: number;
    layers: LayerForEdit[];
    scheme?: SchemeForEdit;
}

/**
 * Преобразует данные клинического случая из формата API
 * в формат, необходимый для EditCaseForm
 *
 * @param caseDetails - данные случая из API
 * @returns объект с caseId, layers и scheme
 */
export function transformCaseDataForEdit(
    caseDetails: CaseDetailsFromAPI
): TransformedCaseData {
    // Первые 3 элемента imgContainer - это слои
    const layerImages = caseDetails.imgContainer.slice(0, 3);

    // Преобразуем слои
    const layers: LayerForEdit[] = layerImages.map((img, index) => ({
        id: img.id,
        number: index + 1, // Номера слоёв: 1, 2, 3
        image: img.image,
        description: caseDetails.descriptionContainer[index] || "", // Описание по индексу
    }));

    // Четвёртый элемент imgContainer - это изображение схемы
    const schemeImageData = caseDetails.imgContainer[3];

    // Формируем объект схемы, если есть все необходимые данные
    const scheme: SchemeForEdit | undefined =
        schemeImageData && caseDetails.imgSchema
            ? {
                id: caseDetails.imgSchema.id,
                image: schemeImageData.image, // 4-е изображение из imgContainer
                descriptionImage: caseDetails.imgSchema.image, // Изображение из imgSchema
            }
            : undefined;

    return {
        caseId: caseDetails.id,
        layers,
        scheme,
    };
}