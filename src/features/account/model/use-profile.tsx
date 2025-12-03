import { useProfileQuery } from "@/entities/profile";
import { accountApi } from "@/shared/api/accountApi";
import { GetProfileInfoDto } from "@/shared/api/accountApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useProfile() {
  const profileQuery = useProfileQuery();
  const [active, setActive] = useState(false);
  const [editState, setEditState] = useState<boolean[]>([false, false, false]);

  const info = profileQuery.data;

  const initialData: Partial<GetProfileInfoDto> = info ?? {};

  // Стейт для редактирования
  const [formData, setFormData] =
    useState<Partial<GetProfileInfoDto>>(initialData);

  // Обновление стейта при получении данных
  useEffect(() => {
    if (info) setFormData(info);
  }, [info]);

  // Мутация для отправки профиля
  const profileEditMutation = useMutation({
    mutationFn: accountApi.editProfile,
    onSuccess: () => {
      console.log("✅ Профиль успешно обновлён");
    },
  });

  const toggleEdit = (index: number) => {
    setEditState((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Сравнение и отправка изменений
  const handleSave = (index: number) => {
    const changedFields = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        const oldValue = (initialData as any)[key];

        if (value === oldValue) return acc;

        if (value === undefined || value === null || value === "") return acc;

        acc[key as keyof GetProfileInfoDto] = value!;
        return acc;
      },
      {} as Partial<GetProfileInfoDto>
    );

    if (Object.keys(changedFields).length === 0) {
      console.log("⚪️ Ничего не изменено или поля пустые — не отправляем");
      toggleEdit(index);
      return;
    }

    console.log("🔹 Отправляем изменённые поля:", changedFields);
    profileEditMutation.mutate(changedFields);
    toggleEdit(index);
  };

  return {
    formData,
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
