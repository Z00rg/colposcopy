import {queryClient} from "@/shared/api/query-client";
import {testApi, SubmitTestAnswersBodyDto} from "@/shared/api/testApi";
import {useMutation, useQuery} from "@tanstack/react-query";

const testListKey = ["test-list"];

const testTasksKey = (id: string) => ["test-tasks", id];

// Запрос списка тестов
export function useTestListQuery() {

    return useQuery({
        queryKey: testListKey,
        queryFn: testApi.getTestListInfo,
        retry: 0,
        staleTime: 60 * 60 * 1000, // 60 минут
    });
}

// Запрос выбранных тестов для прохождения
export function useTestTasksQuery(tasksId: string) {

    return useQuery({
        queryKey: testTasksKey(tasksId),
        queryFn: () => testApi.getTestTasks(tasksId),
        retry: 0,
        staleTime: 5 * 60 * 1000, // 5 минут
    });
}

// Отправка ответов
export function useSubmitAnswersMutation() {

    return useMutation({
        mutationFn: (body: SubmitTestAnswersBodyDto) =>
            testApi.submitTestAnswers(body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["try-list"]});
        },
    });
}
