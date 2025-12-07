import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiInstance } from '@/shared/api/api-instance';

// Типы данных
interface Pathology {
  id: number;
  name: string;
  description: string;
}

interface Answer {
  text: string;
  is_correct: boolean;
}

interface Question {
  name: string;
  instruction: string;
  qtype: 'single' | 'multiple';
  answers: Answer[];
}

interface ClinicalCase {
  name: string;
  pathology: number;
  questions: Question[];
}

// interface PathologyImage {
//   pathology: number;
//   image: File;
// }

// interface Layer {
//   case: number;
//   number: number;
//   layer_img: File;
//   layer_description: string;
// }

// interface Scheme {
//   case: number;
//   scheme_img: File;
//   scheme_description_img: File;
// }

// API функции
const createPathology = (data: Omit<Pathology, 'id'>) => {
  return apiInstance.post('/pathologies/', data).then(response => response.data);
};

const uploadPathologyImage = (data: FormData) => {
  return apiInstance.post('/pathology-images/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => response.data);
};

const createClinicalCase = (data: ClinicalCase) => {
  return apiInstance.post('/case_submit/', data).then(response => response.data);
};

const uploadLayer = (data: FormData) => {
  return apiInstance.post('/layers/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => response.data);
};

const uploadScheme = (data: FormData) => {
  return apiInstance.post('/schemes/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(response => response.data);
};

// Компоненты форм
const PathologyForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Omit<Pathology, 'id'>>();
  
  const mutation = useMutation({
    mutationFn: createPathology,
    onSuccess: () => {
      alert('Патология успешно добавлена');
      reset();
    },
    onError: (error) => {
      console.error('Ошибка при добавлении патологии:', error);
      alert('Ошибка при добавлении патологии');
    }
  });

  const onSubmit = (data: Omit<Pathology, 'id'>) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Добавить патологию</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Название патологии</label>
          <input
            {...register('name', { required: 'Название обязательно' })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите название патологии"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Описание патологии</label>
          <textarea
            {...register('description', { required: 'Описание обязательно' })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите описание патологии"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Отправка...' : 'Добавить патологию'}
        </button>
      </form>
    </div>
  );
};

const PathologyImageForm = () => {
  const [pathologyId, setPathologyId] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadPathologyImage,
    onSuccess: () => {
      alert('Изображение патологии успешно добавлено');
      setPathologyId('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    onError: (error) => {
      console.error('Ошибка при добавлении изображения патологии:', error);
      alert('Ошибка при добавлении изображения патологии');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pathologyId || !image) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const formData = new FormData();
    formData.append('pathology', pathologyId);
    formData.append('image', image);

    mutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Добавить изображение патологии</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID патологии</label>
          <input
            type="number"
            value={pathologyId}
            onChange={(e) => setPathologyId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите ID патологии"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Изображение</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Отправка...' : 'Добавить изображение'}
        </button>
      </form>
    </div>
  );
};

const ClinicalCaseForm = () => {
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<ClinicalCase>();
  const questions = watch('questions') || [];
  
  const mutation = useMutation({
    mutationFn: createClinicalCase,
    onSuccess: () => {
      alert('Клинический случай успешно добавлен');
      reset();
    },
    onError: (error) => {
      console.error('Ошибка при добавлении клинического случая:', error);
      alert('Ошибка при добавлении клинического случая');
    }
  });

  const addQuestion = () => {
    const newQuestion: Question = {
      name: '',
      instruction: '',
      qtype: 'single',
      answers: [{ text: '', is_correct: false }]
    };
    
    const currentQuestions = watch('questions') || [];
    setValue('questions', [...currentQuestions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = watch('questions') || [];
    const updatedQuestions = currentQuestions.filter((_, i) => i !== index);
    setValue('questions', updatedQuestions);
  };

  const addAnswer = (questionIndex: number) => {
    const currentQuestions = watch('questions') || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].answers.push({ text: '', is_correct: false });
    setValue('questions', updatedQuestions);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const currentQuestions = watch('questions') || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].answers = updatedQuestions[questionIndex].answers
      .filter((_, i) => i !== answerIndex);
    setValue('questions', updatedQuestions);
  };

  const updateAnswerText = (questionIndex: number, answerIndex: number, text: string) => {
    const currentQuestions = watch('questions') || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].answers[answerIndex].text = text;
    setValue('questions', updatedQuestions);
  };

  const toggleAnswerCorrect = (questionIndex: number, answerIndex: number) => {
    const currentQuestions = watch('questions') || [];
    const updatedQuestions = [...currentQuestions];
    updatedQuestions[questionIndex].answers[answerIndex].is_correct = 
      !updatedQuestions[questionIndex].answers[answerIndex].is_correct;
    setValue('questions', updatedQuestions);
  };

  const onSubmit = (data: ClinicalCase) => {
    mutation.mutate(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Добавить клинический случай</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Название клинического случая</label>
          <input
            {...register('name', { required: 'Название обязательно' })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите название клинического случая"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">ID патологии</label>
          <input
            type="number"
            {...register('pathology', { 
              required: 'ID патологии обязателен',
              valueAsNumber: true
            })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите ID патологии"
          />
          {errors.pathology && <p className="text-red-500 text-sm mt-1">{errors.pathology.message}</p>}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Вопросы</h4>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Добавить вопрос
            </button>
          </div>
          
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="border rounded p-4 mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-medium">Вопрос {qIndex + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                >
                  Удалить
                </button>
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Название вопроса</label>
                <input
                  {...register(`questions.${qIndex}.name` as const, { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                  placeholder="Введите название вопроса"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Инструкция</label>
                <input
                  {...register(`questions.${qIndex}.instruction` as const, { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                  placeholder="Введите инструкцию"
                />
              </div>
              
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Тип вопроса</label>
                <select
                  {...register(`questions.${qIndex}.qtype` as const, { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
                >
                  <option value="single">Один ответ</option>
                  <option value="multiple">Несколько ответов</option>
                </select>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h6 className="font-medium text-sm">Ответы</h6>
                  <button
                    type="button"
                    onClick={() => addAnswer(qIndex)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Добавить ответ
                  </button>
                </div>
                
                {question.answers?.map((answer, aIndex) => (
                  <div key={aIndex} className="flex items-center mb-2 gap-2">
                    <input
                      type="text"
                      value={answer.text}
                      onChange={(e) => updateAnswerText(qIndex, aIndex, e.target.value)}
                      className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                      placeholder="Текст ответа"
                    />
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={answer.is_correct}
                        onChange={() => toggleAnswerCorrect(qIndex, aIndex)}
                        className="mr-1"
                      />
                      Правильный
                    </label>
                    <button
                      type="button"
                      onClick={() => removeAnswer(qIndex, aIndex)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Отправка...' : 'Добавить клинический случай'}
        </button>
      </form>
    </div>
  );
};

const LayerForm = () => {
  const [caseId, setCaseId] = useState('');
  const [number, setNumber] = useState('');
  const [layerImage, setLayerImage] = useState<File | null>(null);
  const [layerDescription, setLayerDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadLayer,
    onSuccess: () => {
      alert('Слой успешно добавлен');
      setCaseId('');
      setNumber('');
      setLayerImage(null);
      setLayerDescription('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    onError: (error) => {
      console.error('Ошибка при добавлении слоя:', error);
      alert('Ошибка при добавлении слоя');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseId || !number || !layerImage) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const formData = new FormData();
    formData.append('case', caseId);
    formData.append('number', number);
    formData.append('layer_img', layerImage);
    formData.append('layer_description', layerDescription);

    mutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Добавить слой</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID клинического случая</label>
          <input
            type="number"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите ID клинического случая"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Номер слоя</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите номер слоя"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Изображение слоя</label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setLayerImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Описание слоя</label>
          <textarea
            value={layerDescription}
            onChange={(e) => setLayerDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите описание слоя"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Отправка...' : 'Добавить слой'}
        </button>
      </form>
    </div>
  );
};

const SchemeForm = () => {
  const [caseId, setCaseId] = useState('');
  const [schemeImage, setSchemeImage] = useState<File | null>(null);
  const [schemeDescriptionImage, setSchemeDescriptionImage] = useState<File | null>(null);
  const schemeFileInputRef = useRef<HTMLInputElement>(null);
  const descriptionFileInputRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation({
    mutationFn: uploadScheme,
    onSuccess: () => {
      alert('Схема успешно добавлена');
      setCaseId('');
      setSchemeImage(null);
      setSchemeDescriptionImage(null);
      if (schemeFileInputRef.current) schemeFileInputRef.current.value = '';
      if (descriptionFileInputRef.current) descriptionFileInputRef.current.value = '';
    },
    onError: (error) => {
      console.error('Ошибка при добавлении схемы:', error);
      alert('Ошибка при добавлении схемы');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseId || !schemeImage || !schemeDescriptionImage) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const formData = new FormData();
    formData.append('case', caseId);
    formData.append('scheme_img', schemeImage);
    formData.append('scheme_description_img', schemeDescriptionImage);

    mutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-bold mb-4">Добавить схему</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID клинического случая</label>
          <input
            type="number"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Введите ID клинического случая"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Изображение схемы</label>
          <input
            type="file"
            ref={schemeFileInputRef}
            onChange={(e) => setSchemeImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Изображение описания схемы</label>
          <input
            type="file"
            ref={descriptionFileInputRef}
            onChange={(e) => setSchemeDescriptionImage(e.target.files?.[0] || null)}
            accept="image/*"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        
        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {mutation.isPending ? 'Отправка...' : 'Добавить схему'}
        </button>
      </form>
    </div>
  );
};

export function AdminHomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Админ-панель</h1>
      
      <div className="space-y-8">
        <PathologyForm />
        <PathologyImageForm />
        <ClinicalCaseForm />
        <LayerForm />
        <SchemeForm />
      </div>
    </div>
  );
}