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

export const layout1: { questions: Question[] } = {
    "questions": [
        {
            "name": "Первичный осмотр",
            "instruction": "Выберите один ответ",
            "qtype": "single",
            "answers": [
                {
                    "text": "Кольпоскопическая картина удовлетворительная",
                    "is_correct": false
                },
                {
                    "text": "Кольпоскопическая картина неудовлетворительная",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Граница между МПЭ и ЦЭ",
            "instruction": "Оцените видимость границы между эпителиями. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Визуализируется полностью",
                    "is_correct": false
                },
                {
                    "text": "Визуализируется частично",
                    "is_correct": false
                },
                {
                    "text": "Не визуализируется",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Открытые или закрытые железы.",
            "instruction": "Выберите один ответ",
            "qtype": "single",
            "answers": [
                {
                    "text": "Видны множественные открытые железы в виде темных «кратеров».",
                    "is_correct": false
                },
                {
                    "text": "Определяются закрытые железы (Наботовы кисты) с желтоватым содержимым.",
                    "is_correct": false
                },
                {
                    "text": "На данной кольпоскопии железы не визуализируются",
                    "is_correct": true
                },
                {
                    "text": "Зона трансформации не определена, поэтому оценить железы невозможно.",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Мозаика",
            "instruction": "Опишите тип мозаики, если она есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нежная",
                    "is_correct": false
                },
                {
                    "text": "Грубая",
                    "is_correct": true
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Ацетобелый эпителий",
            "instruction": "Опишите характеристики ацетобелого эпителия, если он есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нежный с нечеткими краями",
                    "is_correct": false
                },
                {
                    "text": "Грубый по всей поверхности с четкими краями",
                    "is_correct": true
                },
                {
                    "text": "Нежный с четкими краями",
                    "is_correct": false
                },
                {
                    "text": "Ацетобелый эпителий отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Проба Шиллера",
            "instruction": "Оцените результат пробы с раствором Люголя. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Йод-позитивная реакция есть",
                    "is_correct": true
                },
                {
                    "text": "Йод-негативная реакция нет",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Пунктация",
            "instruction": "Опишите тип пунктации, если она есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нежная",
                    "is_correct": false
                },
                {
                    "text": "Грубая",
                    "is_correct": false
                },
                {
                    "text": "Отсутствует",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Оценка кольпоскопической картины",
            "instruction": "Определите характеристику и выберите один ответ. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нормальная",
                    "is_correct": false
                },
                {
                    "text": "Аномальная",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Постановка типа ЗТ",
            "instruction": "Поставьте заключение на основе всех данных. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "ЗТ тип I",
                    "is_correct": false
                },
                {
                    "text": "ЗТ тип II",
                    "is_correct": false
                },
                {
                    "text": "ЗТ тип III",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Постановка диагноза",
            "instruction": "Поставьте заключение на основе всех данных. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нормальная кольпоскопическая картина",
                    "is_correct": false
                },
                {
                    "text": "Аномальная кольпоскопическая картина 1 степени",
                    "is_correct": true
                },
                {
                    "text": "Аномальная кольпоскопическая картина 2 степени",
                    "is_correct": false
                },
                {
                    "text": "Подозрение на инвазию",
                    "is_correct": false
                },
                {
                    "text": "Лейкоплакия",
                    "is_correct": false
                },
                {
                    "text": "Эрозия",
                    "is_correct": false
                },
                {
                    "text": "Йоднегативная зона",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Рекомендации исходя из данных кольпоскопической картины.",
            "instruction": "Назначьте план дальнейшего обследования. (можно выбрать несколько ответов)",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Микроскопическое исследование мазка",
                    "is_correct": true
                },
                {
                    "text": "Мазок на онкоцитологию",
                    "is_correct": true
                },
                {
                    "text": "Обследование на ИППП",
                    "is_correct": true
                },
                {
                    "text": "ПЦР на ВПЧ",
                    "is_correct": true
                },
                {
                    "text": "Прицельная биопсия шейки матки с выскабливанием цервикального канала, определиться с тактикой ведения после получения результатов гистологии",
                    "is_correct": true
                },
                {
                    "text": "Хирургическое лечение",
                    "is_correct": false
                },
                {
                    "text": "Противовоспалительное лечение",
                    "is_correct": false
                },
                {
                    "text": "Оценка микробиоты влагалища, шейки матки",
                    "is_correct": false
                },
                {
                    "text": "LEEP, LLETZ",
                    "is_correct": false
                },
                {
                    "text": "Конизация шейки матки (ДЭК) и выскабливание цервикального канала",
                    "is_correct": false
                },
                {
                    "text": "Прицельная биопсия",
                    "is_correct": false
                },
                {
                    "text": "Консультация онколога",
                    "is_correct": false
                },
                {
                    "text": "ДЭК",
                    "is_correct": false
                },
                {
                    "text": "Выскабливание цервикального канала",
                    "is_correct": false
                },
                {
                    "text": "РДВ",
                    "is_correct": false
                },
                {
                    "text": "Криодеструкция шейки матки",
                    "is_correct": false
                },
                {
                    "text": "Лазерная вапоризация",
                    "is_correct": false
                }
            ]
        }
    ]
}

export const layout2: { questions: Question[] } = {
    "questions": [
        {
            "name": "Первичный осмотр",
            "instruction": "Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Кольпоскопическая картина адекватная",
                    "is_correct": true
                },
                {
                    "text": "Кольпоскопическая картина неадекватная",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Граница между МПЭ и ЦЭ",
            "instruction": "Оцените видимость границы между эпителиями. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Визуализируется полностью",
                    "is_correct": true
                },
                {
                    "text": "Визуализируется частично",
                    "is_correct": false
                },
                {
                    "text": "Не визуализируется",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Тип зоны трансформации",
            "instruction": "Определите, насколько полно видна зона трансформации. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Тип I (полностью видна)",
                    "is_correct": true
                },
                {
                    "text": "Тип II (частично скрыта в канале)",
                    "is_correct": false
                },
                {
                    "text": "Тип III (полностью скрыта в канале)",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Многослойный плоский эпителий (МПЭ)",
            "instruction": "Охарактеризуйте состояние многослойного плоского эпителия. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Зрелый",
                    "is_correct": true
                },
                {
                    "text": "Атрофический",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Цилиндрический эпителий (ЦЭ)",
            "instruction": "Охарактеризуйте визуализацию цилиндрического эпителия. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Эктопия по передней губе",
                    "is_correct": false
                },
                {
                    "text": "Эктопия по задней губе",
                    "is_correct": false
                },
                {
                    "text": "Эктопия по передней и по задней губе",
                    "is_correct": true
                },
                {
                    "text": "Не визуализируется",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Метапластический эпителий",
            "instruction": "Оцените состояние метапластического эпителия. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Зрелый метапластический эпителий",
                    "is_correct": true
                },
                {
                    "text": "Незрелый метапластический эпителий",
                    "is_correct": false
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Открытые или закрытые железы",
            "instruction": "Оцените состояние желёз. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Открытые железы в виде темных «кратеров» в зоне метаплазии.",
                    "is_correct": true
                },
                {
                    "text": "Определяются закрытые железы (Наботовы кисты) с желтоватым содержимым.",
                    "is_correct": false
                },
                {
                    "text": "На данной кольпоскопии никакие железы не визуализируются.",
                    "is_correct": false
                },
                {
                    "text": "Зона трансформации не определена, поэтому оценить железы невозможно.",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Ацетобелый эпителий (АБЭ)",
            "instruction": "Опишите характеристики ацетобелого эпителия, если он есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Тонкий с нечеткими краями",
                    "is_correct": false
                },
                {
                    "text": "Плотный с четкими краями",
                    "is_correct": true
                },
                {
                    "text": "Ацетобелый плотный ободок вокруг открытых желёз (крипт)",
                    "is_correct": false
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Мозаика",
            "instruction": "Опишите тип мозаики, если она есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нежная",
                    "is_correct": false
                },
                {
                    "text": "Грубая",
                    "is_correct": true
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Пунктация",
            "instruction": "Опишите тип пунктации, если она есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нежная",
                    "is_correct": false
                },
                {
                    "text": "Грубая",
                    "is_correct": true
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Локализация аномалии (при наличии)",
            "instruction": "Укажите расположение аномалии (от 1 до 12 часов условного циферблата) и размер аномального участка от «менее 10» до 100%.",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Вокруг наружного зева",
                    "is_correct": true
                },
                {
                    "text": "Размер 70% от площади экзоцервикса",
                    "is_correct": true
                },
                {
                    "text": "Отсутствует",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Охарактеризуйте сосуды",
            "instruction": "Опишите характеристики сосудов, если они есть. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Атипичные сосуды в виде «штопора» и «запятых»",
                    "is_correct": false
                },
                {
                    "text": "«Ломкие» сосуды",
                    "is_correct": false
                },
                {
                    "text": "Нормальные, древовидно ветвящиеся капилляры стромы, просвечивающие через истонченный эпителий.",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Неспецифические признаки",
            "instruction": "Отметьте подходящее описание (можно выбрать несколько ответов)",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Лейкоплакия",
                    "is_correct": false
                },
                {
                    "text": "Эрозия",
                    "is_correct": false
                },
                {
                    "text": "Отсутствуют",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Проба Шиллера",
            "instruction": "Оцените результат пробы с раствором Люголя. Выберите один ответ.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Йод-позитивная реакция (нормальное окрашивание)",
                    "is_correct": false
                },
                {
                    "text": "Йод-негативная реакция (участки не окрасились)",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Другие признаки",
            "instruction": "Отметьте подходящее описание (можно выбрать несколько ответов)",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Врожденная зона трансформации",
                    "is_correct": false
                },
                {
                    "text": "Стеноз",
                    "is_correct": false
                },
                {
                    "text": "Кондиломы",
                    "is_correct": false
                },
                {
                    "text": "Врожденные аномалии",
                    "is_correct": false
                },
                {
                    "text": "Эндометриоз",
                    "is_correct": false
                },
                {
                    "text": "Последствия ранее проведенного лечения",
                    "is_correct": false
                },
                {
                    "text": "Воспаление",
                    "is_correct": false
                },
                {
                    "text": "Отсутствуют",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Признаки инвазии",
            "instruction": "Отметьте подходящее описание (можно выбрать несколько ответов)",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Атипические сосуды",
                    "is_correct": false
                },
                {
                    "text": "Экзофитное поражение",
                    "is_correct": false
                },
                {
                    "text": "Некроз, изъязвления",
                    "is_correct": false
                },
                {
                    "text": "Отсутствуют",
                    "is_correct": true
                }
            ]
        },
        {
            "name": "Выберите тип ЗТ:",
            "instruction": "Поставьте заключение на основе всех данных.",
            "qtype": "single",
            "answers": [
                {
                    "text": "ЗТ тип I",
                    "is_correct": true
                },
                {
                    "text": "ЗТ тип II",
                    "is_correct": false
                },
                {
                    "text": "ЗТ тип III",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Кольпоскопический диагноз:",
            "instruction": "Поставьте заключение на основе всех данных.",
            "qtype": "single",
            "answers": [
                {
                    "text": "Нормальная кольпоскопическая картина",
                    "is_correct": false
                },
                {
                    "text": "Аномальная кольпоскопическая картина 1 степени",
                    "is_correct": false
                },
                {
                    "text": "Аномальная кольпоскопическая картина 2 степени",
                    "is_correct": true
                },
                {
                    "text": "Аномальная кольпоскопическая картина неспецифическая:",
                    "is_correct": false
                },
                {
                    "text": "Другая кольпоскопическая картина:",
                    "is_correct": false
                },
                {
                    "text": "Подозрение на инвазию",
                    "is_correct": false
                }
            ]
        },
        {
            "name": "Рекомендации в соответствии с данными кольпоскопической картины.",
            "instruction": "Назначьте план дальнейшего обследования (можно выбрать несколько ответов)",
            "qtype": "multiple",
            "answers": [
                {
                    "text": "Микроскопическое исследование отделяемого половых органов",
                    "is_correct": false
                },
                {
                    "text": "Мазок на онкоцитологию",
                    "is_correct": true
                },
                {
                    "text": "Обследование на ИППП",
                    "is_correct": false
                },
                {
                    "text": "ПЦР на ВПЧ",
                    "is_correct": true
                },
                {
                    "text": "Противовоспалительное лечение",
                    "is_correct": false
                },
                {
                    "text": "Удаление полипа шейки матки",
                    "is_correct": false
                },
                {
                    "text": "Деструктивное лечение",
                    "is_correct": false
                },
                {
                    "text": "Прицельная мультифокальная биопсия шейки матки с выскабливанием цервикального канала (LEEP)",
                    "is_correct": false
                },
                {
                    "text": "Эксцизионная биопсия шейки матки с выскабливанием цервикального канала (LLETZ)",
                    "is_correct": true
                },
                {
                    "text": "Конизация шейки матки с выскабливанием цервикального канала",
                    "is_correct": false
                },
                {
                    "text": "Забор эндоцервикального образца (ЭЦО)",
                    "is_correct": false
                },
                {
                    "text": "Консультация онколога",
                    "is_correct": false
                },
                {
                    "text": "Динамическое наблюдение",
                    "is_correct": false
                }
            ]
        }
    ]
}