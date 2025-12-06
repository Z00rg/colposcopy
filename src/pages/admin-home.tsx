import { useState, ChangeEvent } from 'react';
import { UiCard } from '@/shared/ui/ui-card';
import { UiInput } from '@/shared/ui/ui-input';
import { UiTextArea } from '@/shared/ui/ui-textarea';
import { UiButton } from '@/shared/ui/ui-button';

interface Pathology {
  id: number;
  name: string;
  description: string;
}

export function AdminHomePage() {
  // Состояния для формы патологии
  const [pathologyName, setPathologyName] = useState('');
  const [pathologyDescription, setPathologyDescription] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Состояния для загрузки изображений
  const [selectedPathologyId, setSelectedPathologyId] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pathologiesList, setPathologiesList] = useState<Pathology[]>([]);

  // Функция для добавления новой патологии
  const handleAddPathology = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/pathologies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pathologyName,
          description: pathologyDescription,
        }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Патология успешно добавлена!' });
        setPathologyName('');
        setPathologyDescription('');
        
        // Обновим список патологий для загрузки изображений
        fetchPathologies();
      } else {
        const errorData = await response.json();
        setNotification({ type: 'error', message: `Ошибка: ${errorData.detail || 'Неизвестная ошибка'}` });
      }
    } catch (error) {
      setNotification({ type: 'error', message: `Ошибка сети: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` });
    }
  };

  // Функция для загрузки изображения
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPathologyId || !imageFile) {
      setNotification({ type: 'error', message: 'Пожалуйста, выберите патологию и изображение' });
      return;
    }

    const formData = new FormData();
    formData.append('pathology', selectedPathologyId);
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/pathology-images/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setNotification({ type: 'success', message: 'Изображение успешно загружено!' });
        setSelectedPathologyId('');
        setImageFile(null);
      } else {
        const errorData = await response.json();
        setNotification({ type: 'error', message: `Ошибка: ${errorData.detail || 'Неизвестная ошибка'}` });
      }
    } catch (error) {
      setNotification({ type: 'error', message: `Ошибка сети: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` });
    }
  };

  // Загрузка списка патологий для выпадающего списка
  const fetchPathologies = async () => {
    try {
      const response = await fetch('/api/pathologies/');
      if (response.ok) {
        const data = await response.json();
        setPathologiesList(data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке патологий:', error);
    }
  };

  // Загружаем патологии при монтировании компонента
  useState(() => {
    fetchPathologies();
  });

  // Обработчик изменения файла
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Очистка уведомления
  const clearNotification = () => {
    setNotification(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-10 p-10">
      <h1 className="text-4xl font-bold">Админ панель</h1>
      
      {notification && (
        <div 
          className={`p-4 rounded-lg mb-4 w-full max-w-md text-center ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}
        >
          {notification.message}
          <button 
            onClick={clearNotification} 
            className="ml-4 text-sm underline"
          >
            Закрыть
          </button>
        </div>
      )}
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Вкладка для добавления патологии */}
        <UiCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Добавить патологию</h2>
          <form onSubmit={handleAddPathology} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Название патологии</label>
              <UiInput
                type="text"
                value={pathologyName}
                onChange={(e) => setPathologyName(e.target.value)}
                placeholder="Введите название патологии"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Описание патологии</label>
              <UiTextArea
                value={pathologyDescription}
                onChange={(e) => setPathologyDescription(e.target.value)}
                placeholder="Введите описание патологии"
                required
              />
            </div>
            <UiButton type="submit" className="w-full">
              Добавить патологию
            </UiButton>
          </form>
        </UiCard>

        {/* Вкладка для загрузки изображений */}
        <UiCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Загрузить изображение для патологии</h2>
          <form onSubmit={handleImageUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Выберите патологию</label>
              <select
                value={selectedPathologyId}
                onChange={(e) => setSelectedPathologyId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Выберите патологию</option>
                {pathologiesList.map((pathology) => (
                  <option key={pathology.id} value={pathology.id.toString()}>
                    {pathology.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Загрузить изображение</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <UiButton type="submit" className="w-full">
              Загрузить изображение
            </UiButton>
          </form>
        </UiCard>
      </div>
    </div>
  );
}