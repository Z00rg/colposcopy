import { useProfileQuery } from "@/entities/profile";
import {
  accountControllerProfileEdit,
  GetProfileInfoDto,
} from "@/shared/api/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useProfile() {
  const profileQuery = useProfileQuery();
  const [active, setActive] = useState(false);
  const [editState, setEditState] = useState<boolean[]>([false, false, false]);

  const info = profileQuery.data;

  // Начальные данные изменить на финале
  const initialData: GetProfileInfoDto = info || {
    firstName: "Артем",
    surname: "Аюпов",
    middleName: "Дмитриевич",
    work: "СамГМУ",
    position: "Ассистент кафедры медицинской физики, математики и информатики",
    email: "ayupov.artev@mail.ru",
    password: "123456789A+",
  };

  // Стейт для редактирования
  const [formData, setFormData] =
    useState<Partial<GetProfileInfoDto>>(initialData);

  // Обновление стейта при получении данных
  useEffect(() => {
    if (info) setFormData(info);
  }, [info]);

  // Мутация для отправки профиля
  const profileEditMutation = useMutation({
    mutationFn: accountControllerProfileEdit,
    onSuccess: () => {
      console.log("✅ Профиль успешно обновлён");
    },
    onError: (error) => {
      console.error("❌ Ошибка при обновлении профиля:", error);
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
        if (value !== (initialData as any)[key]) {
          acc[key as keyof GetProfileInfoDto] = value!;
        }
        return acc;
      },
      {} as Partial<GetProfileInfoDto>
    );

    if (Object.keys(changedFields).length === 0) {
      console.log("Ничего не изменено");
      toggleEdit(index);
      return;
    }

    console.log("Отправляем изменённые поля:", changedFields);
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
