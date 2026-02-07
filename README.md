<div align="center"> <h1>TEST</h1></div>

![Downloads](https://img.shields.io/github/downloads/BeNDYGo/PredProf/total.svg)
![GitHub Repo stars](https://img.shields.io/github/stars/BeNDYGo/PredProf)

- ![TG-img](https://cdn-icons-png.freepik.com/16/15047/15047595.png) [Pipodripo](https://t.me/pipodripo)
- ![Gmail-img](https://cdn-icons-png.freepik.com/16/5968/5968534.png?ga=GA1.1.1230537149.1769259151) bendygo6@gmail.com

Веб-приложение для тренировки заданий и PVP‑соревнований с личной статистикой и админ‑панелью управления заданиями.

<div align="center"> <h2>Запуск проекта:</h2></div>
Проект статический, поэтому достаточно открыть страницы в браузере 

<div align="center"> <h2>Технические особенности:</h2></div>
эта страница только для сайта, локальную опенсорс версию вы можете посмотреть в другом реппе:

[GitHub](https://github.com/BeNDYGo/PredProf)

## Технологический стек
- HTML, CSS, Vanilla JavaScript
- REST API через `fetch`
- WebSocket для PVP‑матчей
- LocalStorage для хранения сессии пользователя

## Основные функции
- Регистрация и вход пользователей
- Личный кабинет со статистикой: победы/поражения, рейтинг, процент побед, круговая диаграмма
- Каталог заданий с фильтрами по предмету, типу и сложности
- Показ/скрытие ответа к заданию
- PVP‑режим с матчмейкингом и обновлением рейтинга
- Админ‑панель: добавление заданий, просмотр данных пользователя, смена роли

## Страницы
- `main.html` — личная статистика
- `tasks.html` — каталог заданий
- `pvp.html` — PVP‑режим
- `login.html` — вход
- `register.html` — регистрация
- `admin.html` — админ‑панель

## API и WebSocket
Приложение ожидает внешний сервер. Адреса задаются в JS‑файлах:
- REST API: `js/components.js`, `js/login.js`, `js/register.js`
- WebSocket: `js/pvp.js`

Используемые endpoint'ы:
- `POST /api/register`
- `POST /api/login`
- `GET /api/userInfo?username=...`
- `GET /api/getUserAllInfo?username=...`
- `GET /api/getAllTasks?subject=...&taskType=...&difficulty=...`
- `POST /api/addTask?subject=...`
- `GET /api/changeRole?username=...&role=...`
- `WS /api/ws?username=...`

## Роли
- Пользователь — доступ к заданиям, PVP и статистике
- Администратор — доступ к `admin.html` (добавление заданий и управление ролями)