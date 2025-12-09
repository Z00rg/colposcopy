import { useLessonsListQuery } from "@/entities/lessons-list";
import router from "next/router";

export function useLessonsList() {
  const lessonsListQuery = useLessonsListQuery();

  const lessons = lessonsListQuery.data?.items ?? [];

  const handleItemClick = (id: number) => {
    router.push(`/lessons/lesson/${id}`);
  };

  return {
    lessons,
    isLoadingLessons: lessonsListQuery.isPending,
    isErrorLessons: lessonsListQuery.isError,
    handleLessonClick: handleItemClick,
  };
}