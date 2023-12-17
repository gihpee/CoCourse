import React from "react";
import hash from '../assets/profile/hash.svg'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Edit.css";

function Subj() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [boxIsVisible, setBoxIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const options = ['Affect control theory', 'Athletic directing', 'Athletic training', "Children's geographies", 'Communication design', 'Community informatics', 'Community organizing', 'Community practice', 'Conservation biology', 'Counselor education', 'Development geography', 'Earth systems engineering and management', 'Educational', 'Educational leadership', 'Evolutionary developmental psychology', 'Evolutionary educational psychology', 'Fashion-дизайн', 'Fire ecology (Wildland fire management)', 'Gene-culture coevolution', 'HR', 'Health geography', 'Human geography', 'Infographics', 'Manx law', 'Mastery learning', 'New media journalism', 'Nutrition', 'Pain medicine', 'Paralegal studies', 'Police science', 'Printmaking', 'Program semantics', 'Speech and language pathology', 'Studio art', 'Toy and amusement design*', 'VLSI дизайн', 'Абстрактная алгебра', 'Авраамические религии', 'Австралийская литература', 'Автоматизация инженерных расчётов (Computer-aided engineering, CAE)', 'Автоматическое доказательство', 'Автомобилестроение', 'Автомобильное машиностроение', 'Агрономия', 'Агропочвоведение', 'Агротехника', 'Агроэкология', 'Агроэкономика', 'Администрирование в сфере искусств', 'Администрирование в сфере искусств (специализация в музыкальных искусствах)', 'Администрирование в сфере искусств (специализация в театральном искусстве)', 'Аквакультура', 'Аккомпанирование', 'Актерское искусство', 'Актуарные науки', 'Акупунктура', 'Акустика', 'Акустооптика', 'Акушерство', 'Акушерство', 'Алгебра', 'Алгебраическая геометрия', 'Алгебраическая теория чисел', 'Алгебраическая топология', 'Алгебры Ли', 'Алгоритмы', 'Альгология', 'Американистика', 'Американская литература', 'Анализ дискурса', 'Анализ мочи', 'Анализ социальных сетей', 'Анализ цитирования', 'Аналитическая визуализация', 'Аналитическая теория чисел', 'Аналитическая философия', 'Аналитическая химия', 'Анархизм', 'Анатомия', 'Анатомия животных', 'Анатомия человека', 'Английская литература', 'Английская литература', 'Андрология', 'Анестизиология', 'Античная литература', 'Античная философия', 'Антропогенез', 'Антропологическая лингвистика', 'Антропология', 'Антропология религии', 'Арабская литература', 'Арменистика', 'Арменистика', 'Армянская литература', 'Артиллерия', 'Археология', 'Архивоведение', 'Архитектура', 'Архитектура и архитектурный дизайн', 'Архитектура компьютера', 'Архитектура фон Неймана', 'Архитектура, дизайн и прикладное искусство', 'Архитектурное инженерное дело', 'Ассоциативная алгебра', 'Астробиология', 'Астрономия', 'Астрофизика', 'Астрофизика', 'Астрофизика высоких энергий', 'Астрофизика звёзд', 'Астрофизическая плазма', 'Атеизм и Гуманизм', 'Атомная физика', 'Африканистика', 'Африканистика', 'Африканская философия', 'Афроамериканская литература', 'Аффинная геометрия', 'Аэробика*', 'Аэробиология', 'Аэродинамика', 'Аэрокосмическое инженерное дело', 'Аэрокосмическое машиностроение', 'База данных', 'Безопасность дорожного движения', 'Библеистика/Священное Писание', 'Библейский еврейский язык', 'Библиография и Музееведение', 'Библиометрия', 'Бизнес', 'Бизнес-администрирование', 'Биогеография', 'Биоинженерия', 'Биоинформатика', 'Биологическая кибернетика', 'Биологическая психология', 'Биология', 'Биология моря', 'Биология развития', 'Биология систем', 'Биология человека', 'Биомедицинское инженерное дело', 'Биомеханическое инженерное дело', 'Биофизика', 'Биофизика', 'Биохимия', 'Биохимия', 'Биоэкономика', 'Ближневосточная археология', 'Ботаника', 'Британская литература', 'Буддизм', 'Бухгалтерский учёт', 'Валлийская литература', 'Верования африканских народов', 'Верования индейцев', 'Верования китайского народа', 'Ветеринария', 'Вещественный анализ', 'Визуальная коммуникация', 'Визуальная социология', 'Виноградарство', 'Вирусология', 'Внегалактическая астрономия', 'Внутриличностные коммуникации', 'Военная география', 'Военная история', 'Военная история', 'Военная кампания', 'Военная медицина', 'Военная разведка', 'Военная социология', 'Военно-морская архитектура', 'Военно-морская тактика', 'Военно-морская тактика', 'Военно-морское дело', 'Военно-морское проектирование', 'Военно-морское проектирование', 'Военное дело', 'Военное образование и подготовка', 'Военное право', 'Вокал (Пение)', 'Восстановительная терапия', 'Востоковедение', 'Восточная философия', 'Временна́я география', 'Всемирная история', 'Всемирные компьютерные сети (Компьютерные сети)', 'Выпуклая геометрия', 'Высокопроизводительные системы', 'Высшее образование', 'Вычисление в Математике, Естественных науках, Инженерном деле и Медицине', 'Вычисление в Общественных науках, Гуманитарных науках', 'Вычисление в науке (Computational science)', 'Вычислительная биология', 'Вычислительная биология систем', 'Вычислительная геометрия', 'Вычислительная гидрогазодинамика', 'Вычислительная математика', 'Вычислительная нейронаука', 'Вычислительная социология', 'Вычислительная социология', 'Вычислительная теория чисел', 'Вычислительная физика', 'Вычислительная физика', 'Вычислительная химия', 'Вычислительная химия', 'Вычислительная экономика', 'Вычислительная экономика', 'Вычислительные финансы', 'Гамма-астрономия', 'Гарвардская архитектура', 'Гармонический анализ', 'Гаэльская литература', 'Гелиосейсмология', 'Гематология', 'Гематология', 'Геммология', 'Гендерная социология', 'Гендерные исследования', 'Генетика', 'География', 'География', 'География берега', 'География города', 'Геодезия', 'Геодезия', 'Геология', 'Геометрическая оптика', 'Геометрическая теория чисел', 'Геометрическая топология', 'Геометрия и Топология', 'Геоморфология', 'Геоморфология', 'Геополитика (Политическая география)', 'Геотехническое инженерное дело', 'Геофизика', 'Геофизика', 'Геохимия', 'Гериатрия', 'Германистика', 'Геронтология', 'Герпетология', 'Гетеросексизм', 'Гештальттерапия', 'Гидрогеология', 'Гидродинамика', 'Гидродинамика', 'Гидрология', 'Гидрология', 'Гидрология/Гидрография', 'Гинекология', 'Гистология', 'Гляциология', 'Гляциология', 'Гностицизм', 'Гомилетика', 'Гомологическая алгебра', 'Горное дело', 'Городское планирование (городской дизайн)', 'Гостиничный менеджмент', 'Государственная политика', 'Государственная политика', 'Государственная экономика', 'Государственное управление', 'Государственное управление', 'Государственные финансы', 'Гравитационная астрономия', 'Гравитационная астрономия', 'Граждановедение', 'Гражданское право', 'Гражданское процессуальное право', 'Гражданское строительство', 'Графический дизайн', 'Греческий язык Нового Завета', 'Грид', 'Групповая психотерапия', 'Гуманистическая информатика', 'Даосизм', 'Двуязычное образование', 'Деликты', 'Деловая этика', 'Деловой английский', 'Демография', 'Демография', 'Денежные отношения', 'Деревянные духовые инструменты, медные духовые инструменты, и ударные музыкальные инструменты', 'Джазовые течения и новые медиа', 'Джайнизм', 'Диабетология', 'Диахронная лингвистика (или историческая лингвистика)', 'Дизайн', 'Дизайн интерфейса пользователя', 'Дизайн интерьера', 'Дизайн интерьера (архитектура интерьера)', 'Дизайн текстиля', 'Динамические системы', 'Динамические системы', 'Дирижирование', 'Дирижирование ансамблем духовых инструментов', 'Дирижирование оркестром', 'Дирижирование хором', 'Дискретная геометрия', 'Дифференциальная алгебра', 'Дифференциальная геометрия', 'Дифференциальная психология', 'Дифференциальная топология', 'Дифференциальные уравнения в частных производных', 'Догматическое богословие', 'Договоры', 'Доисторическая археология', 'Доктрина', 'Документальная литература', 'Домоводство и потребление', 'Дорожное строительство', 'Драматургия', 'Драматургия', 'Древнеармянская мифология', 'Древнегреческая литература', 'Древнееврейская литература', 'Древнеегипетская религия', 'Древнеримская литература', 'Другие религии', 'Духовная музыка', 'Духовная музыка', 'Еврейско-американская литература', 'Еврейское право', 'Европеистика', 'Египтология', 'Египтология', 'Естественные науки', 'Женские исследования', 'Живопись', 'Животноводческие науки', 'Жилищное хозяйство*', 'Журналистика', 'Журналистика в печатных СМИ', 'Журналистика, средства массовой коммуникации и коммуникация', 'Закон о животных/Права животных', 'Законодательство об охране окружающей среды', 'Западный эзотеризм', 'Звёздная астрономия', 'Звёздный нуклеосинтез', 'Зеленая экономика', 'Зоология', 'Зороастризм', 'Зубная гигиена и epidemiology', 'Зубопротезирование', 'Игротерапия', 'Изобразительное искусство', 'Изобразительные искусства', 'Иммунология', 'Иммунология систем', 'Индивидуальная фитнес-тренировка*', 'Индийская литература', 'Индийские религии', 'Индология', 'Индуизм', 'Инженерия промышленных систем', 'Инженерная теплофизика', 'Инженерная физика', 'Инженерное дело', 'Инженерное дело в оптике', 'Институциональная экономика', 'Интеллектуальная история', 'Интеллектуальный анализ данных', 'Интеракционизм', 'Интерлингвистика', 'Интермодальные перевозки', 'Интернет, Всемирная паутина', 'Интуиционистская логика', 'Информатика', 'Информатика', 'Информатика сообществ', 'Информационная архитектура', 'Информационная система', 'Информационная управленческая система', 'Информационная экономика', 'Информационные науки', 'Информационные системы (Бизнес-информатика)', 'Информационные технологии', 'Информационный менеджмент', 'Информационный поиск', 'Инфракрасная астрономия', 'Иранистика', 'Иранистика', 'Ирландская литература', 'Искусственная нейронная сеть', 'Искусственный интеллект', 'Ислам', 'Исламистская экономика', 'Испанская литература', 'Исполнительские виды искусства', 'Исправительная система', 'Исправительная система', 'Исследование операций', 'Исследование операций', 'Исследований операций', 'Исследования мира и конфликтов', 'Исследования мира и конфликтов (Наука о мире (Иренология))', 'Исследования свободного времени', 'Исследования словосложения', 'Исследования средств массовой информации*', 'Историческая география', 'Историческая лингвистика', 'История', 'История Древнего мира', 'История Европы', 'История Китая', 'История США', 'История вычислительной техники', 'История дипломатии', 'История искусства', 'История культуры', 'История лингвистики', 'История музыки', 'История науки и техники', 'История танца', 'История театра', 'История теории вычислительных систем', 'История труда', 'История философии', 'История христианства', 'История экономики', 'История экономики', 'Исчисление', 'Итальянская литература', 'Иудаизм', 'Ихтиология', 'Каллиграфия', 'Камерная музыка', 'Канадская литература', 'Каноническое право', 'Каноническое право', 'Кардиология', 'Кардиохирургия', 'Картография', 'Квантовая механика', 'Квантовая оптика', 'Квантовая радиофизика', 'Квантовая теория поля', 'Квантовая теория поля', 'Квантовая физика', 'Квантовая химия', 'Квантовая электродинамика', 'Квантовые вычисления', 'Квир-исследования', 'Кельтология', 'Керамическое инженерное дело', 'Кибернетика', 'Кибернетика второго порядка', 'Кинезиология', 'Кино', 'Киноведение', 'Киноведение и телевидение', 'Кинокритика', 'Китайская литература', 'Классическая археология', 'Классическая механика', 'Классическая филология', 'Классическая электродинамика', 'Клеточная биология', 'Климатология', 'Клиническая психология', 'Клиническая психология', 'Клиническая химия', 'Когнитивная наука', 'Когнитивная психология', 'Когнитивно-бихевиоральная терапия', 'Когнитивные науки', 'Количественные методы в психологии', 'Коллективное поведение', 'Коллективный договор', 'Коллоидная химия', 'Комбинаторика', 'Коммуникации между животными', 'Компилятор', 'Комплексный анализ', 'Компьютер и общество', 'Компьютерная безопасность и надежность', 'Компьютерная графика', 'Компьютерное зрение', 'Компьютерные коммуникации (сети)', 'Конституционное право', 'Конструирование вычислительных машин', 'Конструирование инструментария', 'Конструирование регуляторов', 'Конструирование управляющих систем', 'Континентальная философия', 'Конфуцианство', 'Кооперативное обучение', 'Корпорации', 'Космическая социология', 'Краткосрочная психотерапия', 'Креативная документальная литература', 'Креативная художественная литература', 'Креативное сочинительство', 'Креативные искусства', 'Криминалистика', 'Криминология', 'Криобиология', 'Криогеника', 'Криптография', 'Криптография', 'Критическая педагогика', 'Критическая теория', 'Ксенобиология', 'Культурная антропология', 'Культурная география', 'Культурология', 'Культурология и науки об этносах', 'Ландшафтная архитектура (ландшафтное планирование)', 'Ландшафтная экология', 'Ландшафтная экология', 'Латиноамериканская литература', 'Латинский язык', 'Лесоводство', 'Лечение заболеваний стоп', 'Лидерство', 'Лимнология', 'Лимнология', 'Лингвистика и языки', 'Линейная алгебра (Векторные пространства)', 'Линейное программирование', 'Литература', 'Литература идиш', 'Литература хинди', 'Литература эпохи Возрождения', 'Литература юга США', 'Литературная журналистика', 'Литературная журналистика', 'Литературная теория', 'Литературный английский', 'Литературный критицизм', 'Литология', 'Литургика', 'Логика', 'Логика и Основания математики', 'Логика философии', 'Логистика', 'Магнитная гидродинамика', 'Магнитогидродинамика', 'Макроэкономика', 'Маркетинг', 'Маркетинг', 'Марксизм', 'Массовая коммуникация', 'Математика', 'Математическая лингвистика', 'Математическая логика', 'Математическая статистика', 'Математическая теория систем', 'Математическая физика', 'Математическая физика', 'Математическая химия', 'Математическая экономика', 'Математический анализ', 'Математическое образование', 'Материаловедение', 'Материаловедение', 'Машинное обучение', 'Медико-социальная работа', 'Медицина зависимостей', 'Медицина катастроф', 'Медицина сна', 'Медицинская антропология', 'Медицинская информатика', 'Медицинская кибернетика', 'Медицинская психология', 'Медицинская психология', 'Медицинская физика', 'Медицинские науки', 'Медицинские технологии', 'Медицинское дело', 'Медицинское образование', 'Международная экономика', 'Международное право', 'Международные организации', 'Международные отношения', 'Международные отношения', 'Межзвёздная среда', 'Межкультурная коммуникация', 'Менеджмент', 'Менеджмент в спорте', 'Металловедение', 'Металлургическое инженерное дело', 'Метафизика', 'Метаэтика', 'Метеорология', 'Метеорология', 'Метод конечных элементов', 'Механика', 'Механическое инженерное дело', 'Микология', 'Микробиология', 'Микробиология', 'Микроволновая астрономия', 'Микроэкономика', 'Минералогия', 'Мир-системная теория', 'Мирное образование', 'Мировая литература', 'Мифология', 'Мифология и Фольклор', 'Модальная логика', 'Молекулярная биология', 'Молекулярная вирусология', 'Молекулярная физика', 'Морская археология', 'Морские перевозки', 'Морское машиностроение', 'Морское право', 'Морское проектирование', 'Морфология', 'Мужские исследования', 'Музееведение', 'Музыка', 'Музыкальная композиция', 'Музыкальная педагогика', 'Музыкальная психология', 'Музыкальное образование', 'Музыкальное образование', 'Музыкальный театр', 'Музыковедение', 'Мультилинейная алгебра', 'Мультимедиа, гипермедиа', 'Мультипликация', 'Мусульманское право', 'Наблюдательная астрономия', 'Налоговое право', 'Наноинженерия', 'Написание сценариев', 'Народная хореография', 'Наука о Канаде', 'Наука о Латинской Америке', 'Наука о выходцах из Латинской Америки', 'Наука о детях и детстве', 'Наука о поведении', 'Наука о североамериканских индейцах', 'Наука о чикано', 'Наука об Азии', 'Наука об Аппалачи', 'Наука об окружающей среде', 'Наука об экономическом поведении', 'Науки о Земле', 'Науки о гендере и сексуальности', 'Науки о еде', 'Науки о жизни', 'Науки о здоровье', 'Науки о космосе', 'Науки о растениеводстве', 'Науки о системах', 'Науки о системах', 'Науки о территориях (Исследования ареалов)', 'Начальное образование', 'Неассоциативная алгебра', 'Невербальное общение', 'Неврология', 'Недвижимость', 'Неевклидова геометрия', 'Нейробиология', 'Нейропсихология', 'Нейрохирургия', 'Нейрохирургия', 'Нейроэкономика', 'Нейтринная астрономия', 'Нейтронная физика', 'Нелинейная оптика', 'Немецкая литература', 'Неорганическая химия', 'Неотложная медицинская помощь', 'Неравновесная термодинамика', 'Нестандартный анализ', 'Нефрология', 'Нефтегазовая промышленность', 'Нигерийская литература', 'Новая история', 'Новая кибернетика', 'Новое религиозное движение', 'Новозеландская литература', 'Новые английские языки', 'Нормативная этика', 'Нотация танца', 'Нутриология', 'Нутрициология и диетология', 'Обработка естественного языка', 'Обработка естественного языка (Вычислительная лингвистика)', 'Обработка изображений', 'Образование', 'Обучение искусствам', 'Обучение медсетринскому делу', 'Обучение наукам', 'Обучение технологиям', 'Обучение чтению', 'Общая медицинская практика', 'Общая теория систем', 'Общая топология', 'Общественная психология', 'Общественное здоровье', 'Общественные дела', 'Общественные науки', 'Общественный транспорт', 'Объединённые науки о здоровье', 'Объектно-ориентированное программирование', 'Объектно-ориентированные базы данных', 'Обыкновенные дифференциальные уравнения', 'Океанография', 'Океанография', 'Онкология', 'Онтология', 'Оология', 'Операционные системы', 'Оптика', 'Оптимизация', 'Оптическая астрономия', 'Оптометрия', 'Оптоэлектроника', 'Орган и Исторические клавишные инструменты (например, клавесин)', 'Организационная кибернетика', 'Организационная психология', 'Организационные исследования', 'Органическая химия', 'Оркестр', 'Орнитология', 'Ортодонтия', 'Ортопедическая стоматология', 'Ортопедия', 'Отказоустойчивые вычисления', 'Отоларингология', 'Офтальмология', 'Охрана детства', 'Охрана окружающей среды', 'Охрана окружающей среды', 'Охрана памятников истории и культуры', 'Охрана природы и Лесоведение', 'Палеоантропология', 'Палеоантропология', 'Палеобиология', 'Палеобиология', 'Палеогеография', 'Палеоклиматология', 'Палеонтология', 'Палеонтология', 'Парадигмы программирования', 'Паразитология', 'Параллельное программирование', 'Параллельные алгоритмы', 'Параллельные вычислительные системы', 'Пастырское богословие', 'Пастырское консультирование', 'Патология', 'Патология', 'Педагогическая психология', 'Педагогический дизайн', 'Педиатрия', 'Первая помощь', 'Перевод', 'Периодонтология', 'Перцепционная теория управления', 'Пищевая инженерия', 'Пищевое инженерное дело', 'Планетология', 'Плановая экономика', 'Пластическая хирургия', 'Поведенческая география', 'Поведенческая медицина', 'Позитивная психология', 'Политическая антропология', 'Политическая география и геополитика', 'Политическая история', 'Политическая культура', 'Политическая система Канады', 'Политическая система США', 'Политическая социология', 'Политическая экономия', 'Политическая экономия', 'Политические исследования', 'Политическое поведение', 'Политология', 'Политология', 'Половое воспитание', 'Половое воспитание', 'Помология', 'Популяционная генетика', 'Популяционная география', 'Португальская литература и Бразильская литература', 'Постколониальная литература', 'Постмодернистская литература', 'Почвоведение', 'Поэтика', 'Поэтическое творчество', 'Права животных', 'Правительство', 'Право', 'Право собственности', 'Прагматика', 'Предпринимательская экономика', 'Предпринимательство', 'Представление и музыкальная литература', 'Представления групп', 'Преподавание теории музыки', 'Прикладная математика', 'Прикладная психология', 'Прикладная социология', 'Прикладная физика', 'Прикладная философия', 'Приматология', 'Приматология', 'Проективная геометрия', 'Проектирование биологических систем', 'Проектирование биосистем', 'Проектирование в океанологии', 'Проектирование взаимодействия (англ. interaction design)', 'Проектирование зданий и сооружений', 'Проектирование игр*', 'Проектирование материалов', 'Проектирование транспортных средств', 'Проектирование шоссе', 'Производственная инженерия', 'Производственные и трудовые отношения', 'Производство', 'Промышленное предприятие', 'Промышленный дизайн (проектирование продукта)', 'Пропаганда', 'Просвещение потребителей', 'Протезирование суставов', 'Противопожарная безопасность (противопожарная защита)', 'Профессии и Прикладные науки', 'Профессиональное образование', 'Профилактическая медицина', 'Псефология', 'Психиатрия', 'Психическое здоровье', 'Психоакустика', 'Психоанализ', 'Психодрама', 'Психологическая антропология', 'Психологическая оценка', 'Психологическое консультирование', 'Психология', 'Психология', 'Психология женщины', 'Психология здоровья', 'Психология здоровья', 'Психология личности', 'Психология мужчины', 'Психология нравственности', 'Психология образования', 'Психология развития', 'Психология спорта', 'Психология спорта', 'Психология средств массовой информации', 'Психометрия', 'Психопатология', 'Психотерапия', 'Психофизика', 'Пульмонология', 'Пчеловодство', 'Радио*', 'Радиоастрономия', 'Радиожурналистика', 'Радиология', 'Радиофизика', 'Разработка методов безопасности', 'Разработка методов проверки качества', 'Разработка полимеров', 'Разработка программного обеспечения', 'Разработка программного обеспечения', 'Рандомизированные алгоритмы', 'Ранняя музыка', 'Распределенные алгоритмы', 'Распределенные базы данных', 'Распределенные вычисления', 'Реабилитационная медицина', 'Ревматология', 'Региональная география', 'Реклама', 'Рекреационная экология', 'Религии Восточной Азии', 'Религиоведение', 'Религиозное и духовное руководство / Богословие', 'Религиозное образование', 'Религиозное образование', 'Реляционные базы данных', 'Рентгеновская астрономия', 'Рентгеновская оптика', 'Реология', 'Респираторная медицина', 'Речевая коммуникация', 'Риск-менеджмент и страхование', 'Рисование', 'Риторика', 'Риторика', 'Робототехника', 'Ротовая и челюстно-лицевая хирургия', 'Русская литература', 'Садоводство', 'Сакраментология', 'Сапёрное дело', 'Связи с общественностью (Public relations, PR)', 'Священные Писания и библейские языки', 'Сейсмостойкое строительство', 'Сексология', 'Сексология', 'Сексуальное поведение человека', 'Сексуальность человека', 'Сельское хозяйство', 'Сельскохозяйственное инженерное дело', 'Сельскохозяйственное образование', 'Семантика', 'Семейная терапия', 'Семиотика', 'Серология', 'Сикхизм', 'Символический интеракционизм', 'Символьное вычисление', 'Синология (Китаеведение)', 'Синтаксис', 'Синтетическая биология', 'Синтоизм', 'Синхронная лингвистика (или дескриптивная лингвистика)', 'Система вооружения', 'Система управления', 'Систематика (Таксономия)', 'Систематическое богословие', 'Системная динамика', 'Системная психология', 'Системная терапия', 'Системный анализ', 'Системотехника', 'Системотехника', 'Скандинавистика', 'Скульптура', 'Славяноведение', 'Сложные системы', 'Случайный процесс', 'Современная философия', 'Современный язык', 'Сопротивление материалов', 'Сохранение предметов искусства', 'Социальная география', 'Социальная динамика', 'Социальная инженерия', 'Социальная политика', 'Социальная политика', 'Социальная психология', 'Социальная психология', 'Социальная работа', 'Социальная работа в школе', 'Социальная стратификация', 'Социальная теория', 'Социальная философия', 'Социальная философия и Политическая философия', 'Социальная экономика', 'Социальное исследование', 'Социальное развитие', 'Социальные движения', 'Социальный капитал', 'Социальный конструктивизм', 'Социальный контроль', 'Социобиология', 'Социокибернетика', 'Социолингвистика', 'Социолингвистика', 'Социолингвистика', 'Социологическая теория', 'Социология', 'Социология девиантного поведения', 'Социология знания', 'Социология культуры', 'Социология медицины', 'Социология музыки', 'Социология науки', 'Социология образования', 'Социология образования', 'Социология общественного мнения', 'Социология организации', 'Социология права', 'Социология религии', 'Социология семьи', 'Социология спорта', 'Социология спорта', 'Социология труда', 'Социология управления', 'Социоэкономика', 'Спелеология', 'Спортивная журналистика', 'Спортивная медицина', 'Спортивная медицина', 'Спортивная медицина', 'Спортивная тренировка', 'Сравнительная анатомия', 'Сравнительная политология', 'Сравнительная социология', 'Сравнительное богословие', 'Сравнительное литературоведение', 'Сравнительное право', 'Сравнительное религиоведение', 'Средневековая литература', 'Средневековая философия', 'Среднее образование', 'Средства массовой информации*', 'Статистика', 'Статистическая механика', 'Статистическая физика', 'Стоматологическая хирургия', 'Стоматология', 'Стратегическая география', 'Стратегия', 'Структуры данных', 'Струнные музыкальные инструменты, арфа, и гитара', 'Судебная антропология', 'Судебная медицина', 'Судебная психология', 'Судостроение', 'Сфера деятельности духовенства', 'Сценография', 'Тактика', 'Тамильская литература', 'Танец', 'Танец', 'Театр', 'Театральная режиссура', 'Текстиль*', 'Телевидение*', 'Телевизионные средства*', 'Телекоммуникационное инженерное дело', 'Телеология', 'Теология', 'Теоретическая социология', 'Теоретическая физика', 'Теоретическая химия', 'Теория автоматов (Формальные языки)', 'Теория биохимических систем', 'Теория ведения наземных войн', 'Теория вероятности', 'Теория вычислений', 'Теория вычислений', 'Теория вычислимости', 'Теория графов', 'Теория групп', 'Теория доказательств', 'Теория живых систем', 'Теория игр', 'Теория игр', 'Теория игр', 'Теория информации', 'Теория информации', 'Теория информации', 'Теория категорий', 'Теория кодирования', 'Теория колец', 'Теория конфликта', 'Теория линейных стационарных систем', 'Теория медсестринского дела', 'Теория меры', 'Теория множеств', 'Теория моделей', 'Теория музыки', 'Теория операторов', 'Теория параллелизма', 'Теория поля', 'Теория потребительского выбора', 'Теория приближений', 'Теория рекурсии', 'Теория решёток (Теория порядка)', 'Теория семейных систем', 'Теория систем', 'Теория сложности', 'Теория сложности вычислений', 'Теория сложности вычислений', 'Теория социотехнических систем', 'Теория телевидения', 'Теория типов', 'Теория управления', 'Теория упругости', 'Теория хаоса', 'Теория хаоса', 'Теория человеческого развития', 'Теория чисел', 'Теория эволюционных систем', 'Теория экологических систем', 'Теория экономического роста', 'Теплофизика', 'Терапия (общая медицина)', 'Тератология', 'Термодинамика', 'Техника письма', 'Техническая кибернетика', 'Техническая физика', 'Технология машиностроения', 'Технология образования', 'Токсикология', 'Точные науки', 'Травматология', 'Транспортировка', 'Транспортная экономика', 'Транспортное машиностроение', 'Транспортное машиностроение', 'Трансфузиология', 'Трудовое право', 'Туристическая география', 'УФ-астрономия', 'Уголовное право', 'Уголовное судопроизводство', 'Уголовное судопроизводство', 'Уголовный процесс', 'Управление в чрезвычайных ситуациях', 'Управление данными', 'Управление знаниями', 'Управление музеем', 'Управление некоммерческими организациями', 'Управление некоммерческой организацией', 'Управление неправительственной организацией', 'Управление общественным питанием*', 'Управление общественными организациями', 'Управление охраной окружающей среды', 'Управление портом', 'Управление природными ресурсами', 'Управлением портом', 'Урбанистика или Социология города/Социология села', 'Урология', 'Устойчивое развитие', 'Учебный план и обучение', 'Фармакология', 'Фармация', 'Феминистская география', 'Феминистская социология', 'Феминистская философия', 'Феминистская философия', 'Феминистская экономика', 'Феноменология', 'Физика', 'Физика атомов и молекул', 'Физика конденсированного состояния', 'Физика космических лучей', 'Физика низких температур', 'Физика плазмы', 'Физика сплошных сред', 'Физика твёрдого тела', 'Физика ускорителей', 'Физика элементарных частиц', 'Физиология', 'Физиология упражнений', 'Физиология человека', 'Физиотерапия', 'Физическая антропология', 'Физическая география', 'Физическая кинетика', 'Физическая космология', 'Физическая космология', 'Физическая культура и отдых человека*', 'Физическая химия', 'Физическое воспитание', 'Физическое воспитание', 'Физическое образование', 'Филология', 'Философия', 'Философия Биологии', 'Философия Психологии', 'Философия Физики', 'Философия Химии', 'Философия времени', 'Философия искусственного интеллекта и наука о мышлении', 'Философия истории', 'Философия математики', 'Философия модерна', 'Философия музыки', 'Философия музыки', 'Философия науки', 'Философия образования', 'Философия образования', 'Философия политики', 'Философия религии', 'Философия сознания', 'Философия социологии', 'Философия экономики', 'Философия языка', 'Философские школы', 'Финансовая экономика', 'Финансы', 'Фольклор', 'Фонетика', 'Фонология', 'Формальные методы (Формальная верификация)', 'Формирование звёзд', 'Формирование и эволюция галактик', 'Фортепьяно', 'Фотография', 'Фотометрия', 'Фотоника', 'Фрактальная геометрия', 'Французская литература', 'Функциональное программирование', 'Функциональный анализ', 'Футуродизайн', 'Футурология', 'Хемоинформатика', 'Химическая физика', 'Химическое инженерное дело', 'Химическое образование', 'Химия', 'Химия окружающей среды', 'Хирургия', 'Хирургия плеч', 'Хирургия при ожирении', 'Хирургия рук (кистей)', 'Хирургия ступней и лодыжек', 'Хореография', 'Христианство', 'Хронобиология', 'Церковно-славянский язык', 'Цитология', 'Цифровые гуманитарные науки (Humanities computing)', 'Человеко-компьютерное взаимодействие', 'Численное моделирование в', 'Численный анализ', 'Численный анализ', 'Чёрные дыры', 'Шотландская литература', 'Шумеро-аккадская мифология', 'Эволюционная психология', 'Эволюционная экономическая теория', 'Эволюционное учение', 'Эволюция звёзд', 'Экклесиология', 'Экологическая география', 'Экологическая инженерия', 'Экологическая экономика', 'Экологическая экономика', 'Экологическое инженерное дело', 'Экология', 'Экология систем', 'Экология человека', 'Экология человека', 'Экология человеческого поведения', 'Экология экосистем', 'Эконометрика', 'Эконометрика', 'Экономика', 'Экономика в области недвижимого имущества', 'Экономика в области природных ресурсов', 'Экономика и право', 'Экономика общественного благосостояния', 'Экономика развития', 'Экономика сельского хозяйства', 'Экономика труда', 'Экономика труда', 'Экономика управления', 'Экономика энергетики', 'Экономическая антропология', 'Экономическая география', 'Экономическая география', 'Экономическая социология', 'Экономическая социология/Социоэкономика', 'Экономические системы', 'Экономическое развитие', 'Экспериментальная археология', 'Экспериментальная психология', 'Экспериментальная психология', 'Экспертные системы', 'Электродинамика', 'Электронная техника', 'Электротехника', 'Эмбриология', 'Эмоции', 'Энвайронментальная социология', 'Эндодонтика', 'Эндокринология', 'Эндокринология', 'Энология', 'Энтомология', 'Энтомология', 'Эпидемиология', 'Эпистемология', 'Эргодическая теория', 'Эргономика', 'Эргономика', 'Эстетика', 'Этика', 'Этика охраны окружающей среды', 'Этническое музыковедение', 'Этноботаника', 'Этнография', 'Этноистория', 'Этноистория', 'Этнолингвистика', 'Этнология', 'Этнометодология', 'Этномузыковедение', 'Этология', 'Юридическая психология (Психология и право)', 'Юридическое образование', 'Юриспруденция (Философия права)', 'Ядерная физика', 'Ядерное проектирование', 'Языки', 'Языки программирования', 'Языковое образование', 'Японоведение', 'Японская литература', 'коммуникация', 'р-адический анализ', 'региональная анестезия'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://commoncourse.io/user?id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Ошибка при запросе к серверу');
        }

        const data = await response.json();
        if (data[0].subjects) {
          setSelectedOptions(data[0].subjects);
        }
      } catch (error) {
        console.error('Ошибка при запросе к серверу:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setBoxIsVisible(true);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue('');
    setBoxIsVisible(false);
  };

  const handleRemoveOption = (optionToRemove) => {
    const updatedOptions = selectedOptions.filter((option) => option !== optionToRemove);
    setSelectedOptions(updatedOptions);
  };

  const handlePublish = () => {
    fetch('https://commoncourse.io/update-subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, selectedOptions }),
    }).then(() => navigate(`/edit-profile/${id}`));
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const vars = filteredOptions.map((item, index) => (
    <div className="billet_add" key={index} onClick={() => handleOptionClick(item)}>
      <img src={hash} alt="" />
      <p>{item}</p>
    </div>
  ));

  return (
    <div className="column">
      <div className="feedback_top">
        <div className="fback_btn" onClick={() => window.history.back()}></div>
        <div className="subj_billet">Предмет</div>
      </div>
      {selectedOptions.length > 0 ? (
        selectedOptions.map((option) => (
          <div
            className="billet_del"
            key={option}
            onClick={() => handleRemoveOption(option)}
          >
            <img src={hash} alt="" />
            <p>{option}</p>
          </div>
        ))
      ) : (
        <></>
      )}

      <span>выберите Предмет:</span>
      <input
        className="billet_subject"
        onChange={handleSelectChange}
        onFocus={() => setBoxIsVisible(true)}
        value={inputValue}
        style={{ width: '80%' }}
      />
      {boxIsVisible ? (
        <div className="vars_box">{vars}</div>
      ) : (
        <></>
      )}

      <div className="publish" style={{ marginTop: '25px' }}>
        <button className="sf_btn" onClick={handlePublish}>
          СОХРАНИТЬ
        </button>
      </div>
    </div>
  );
}

export default Subj;