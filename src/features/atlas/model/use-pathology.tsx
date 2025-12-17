"use client";

import { usePathologyQuery } from "@/entities/pathology";
import { useParams } from "next/navigation";
import { useState } from "react";

export function usePathology() {
  const params = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const pathologyId = params?.pathologyId;

  const validPathologyId = Array.isArray(pathologyId) ? pathologyId[0] : pathologyId;

  const pathologyQuery = usePathologyQuery(validPathologyId as string);

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