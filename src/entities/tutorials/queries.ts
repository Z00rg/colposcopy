import {tutorialApi} from "@/shared/api/tutorialApi";
import {useQuery} from "@tanstack/react-query";

const tutorialsListKey = ["tutorials-list"];

// Запрос списка уроков
export function useTutorialsListQuery() {

    return useQuery({
        queryKey: tutorialsListKey,
        queryFn: tutorialApi.getTutorialsList,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
    });
}

const tutorialFilesListKey = ["tutorial-files-list"];

// Запрос списка уроков
export function useTutorialFilesListQuery() {

    return useQuery({
        queryKey: tutorialFilesListKey,
        queryFn: tutorialApi.getTutorialFilesList,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
    });
}

const tutorialKey = (id: string) => ["tutorial", id];

// Запрос определенного урока
export function useTutorialQuery(tutorialId: string) {

    return useQuery({
        queryKey: tutorialKey(tutorialId),
        queryFn: () => tutorialApi.getTutorialInfo(tutorialId),
        enabled: !!tutorialId,
        staleTime: 60 * 60 * 1000, // 60 минут
        retry: 0,
    });
}
