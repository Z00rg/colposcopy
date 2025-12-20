"use client"

import { useProfileQuery } from "@/entities/profile";
import { accountApi, GetProfileInfoDto } from "@/shared/api/accountApi";
import { queryClient } from "@/shared/api/query-client";
import { useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";

export function useProfile() {
  const profileQuery = useProfileQuery();
  const info = profileQuery.data;

  const [active, setActive] = useState(false);
  const [editState, setEditState] = useState<boolean[]>([false, false, false]);

  const [formData, setFormData] = useState<Partial<GetProfileInfoDto>>({});

  const displayData = useMemo(() => ({
    ...info,
    ...formData
  }), [info, formData]);


  const profileEditMutation = useMutation({
    mutationFn: (data: Partial<GetProfileInfoDto>) => accountApi.editProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setFormData({});
    },
  });

  const handleChange = (field: keyof GetProfileInfoDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (index: number) => {
    const changedFields = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          const fieldKey = key as keyof GetProfileInfoDto;
          if (value !== info?.[fieldKey] && value !== "") {
            acc[fieldKey] = value as GetProfileInfoDto[keyof GetProfileInfoDto];
          }
          return acc;
        },
        {} as Partial<GetProfileInfoDto>
    );

    if (Object.keys(changedFields).length > 0) {
      profileEditMutation.mutate(changedFields);
    }
    toggleEdit(index);
  };

  const toggleEdit = (index: number) => {
    if( !profileQuery.isError) {
      setEditState((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
    }
  };

  return {
    formData: displayData,
    active,
    setActive,
    editState,
    toggleEdit,
    handleChange,
    handleSave,
    isLoading: profileQuery.isPending,
    isError: profileQuery.isError,
  };
}