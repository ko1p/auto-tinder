# Фронтэнд проекта "Авто-тиндер" (перезагрузка)

[Макет в Figma](https://www.figma.com/file/lccYj5aztjpRBpeLNTQl3G/AutoTinder?node-id=0%3A1)

Архитектура **Feature Sliced Design** (будет)

<pre>
app/                                  # <b>Инициализирующая логика приложения</b>
   ├── providers/                     # Провайдеры приложения (Store, BrowserRouter...)
   ├── store/                         # Инициализация стора Redux
   ├── styles/                        # Глобальные стили 
   └── index.tsx                      # Компонент App

pages/{pageName}/                     # <b>Страницы приложения</b>
   |     ├── ui/                      # Отдельный компоненты страницы
   |     |   └── ComponentName/       # 
   |     ├── lib/                     # Библиотечный код (utils/helpers/types)
   |     └── index.tsx                # Страница
   └── index.tsx                      # Реэкспорт всего

widgets/{widgetName}/                 # <b>Самостоятельные и полноценные блоки для страниц</b>
   |     ├── ui/                      # UI-элементы
   |     ├── model/                   # Бизнес-логика (работа со стором)
   |     ├── lib/                     # Библиотечный код (utils/helpers/types)
   |     └── index.tsx                # Виджет
   └── index.tsx                      # Реэкспорт всего

features/{featureName}/               # <b>Обрабатываемые пользовательские сценарии</b>
   |     ├── ui/                      # UI-элементы
   |     ├── model/                   # Бизнес-логика (работа со стором)
   |     ├── lib/                     # Библиотечный код (utils/helpers/types)
   |     └── index.tsx                # Пользовательский сценарий
   └── index.tsx                      # Реэкспорт всего

entities/{entityName}/                # <b>Бизнес-сущности</b>
   |     ├── ui/                      # UI-элементы
   |     ├── model/                   # Бизнес-логика (обычно работа со стейт-менеджером)
   |     |    ├── state/              # Работа со строками
   |     |    ├── thunk/              # Работа с домом
   |     |    └── index.tsx           # Реэкспорт всего
   |     ├── lib/                     # Библиотечный код (utils/helpers/types)
   |     └── index.tsx                # Бизнесс сущность
   └── index.tsx                      # Реэкспорт всего

shared/                               # <b>Переиспользуемые модули, без привязки к бизнес-логике</b>
   ├── api/                           # Соединение с сервером
   ├── lib/                           # Библиотечный код (utils/helpers/types)
   |    ├── string/                   # Работа со строками
   |    └── dom/                      # Работа с домом
   └── styles/                     	  # Стили для импорта
     
</pre>

## Основные команды:

`npm install` - установка проекта  
`npm start` - Приложение для разработки  
`npm run lint` - lint  
`npm run stylelint` - stylelint