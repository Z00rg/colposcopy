import { usePathologyQuery } from "@/entities/pathology";
import { useRouter } from "next/router";
import { useState } from "react";

export function usePathology() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { pathologyId } = router.query;
  const validPathologyId =
    typeof pathologyId === "string" ? pathologyId : undefined;
  const pathologyQuery = usePathologyQuery(validPathologyId as string);
  // console.log(`Прошел запрос по id ${pathologyId}`)

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return {
    pathologyDetails: pathologyQuery.data,
    isLoading: pathologyQuery.isPending,
    isError: pathologyQuery.isError,
    currentImageIndex,
    handleImageChange,
  };
}