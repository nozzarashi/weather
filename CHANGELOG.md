# Changelog (EN)

## [0.1.0] - 2026-01-18

A complete implementation of a weather dashboard built with Feature-Sliced Design (FSD). The application is fully functional and integrates with the Open-Meteo API.

### 🏗 Architecture & Core

- **FSD Implementation:** Full project structure organized into layers: app, pages, widgets, features, entities, and shared.
- **Tech Stack:** Powered by Vite, React 19, and TypeScript 5.9.
- **Data Fetching:** TanStack Query (v5) integration with custom caching strategies and DevTools.
- **State Management:** Zustand stores for global state (selected city, metrics, and active weekday).
- **Routing:** Basic routing configuration within the `01-app` layer.

### 🌦 Weather Features

- **Current Weather:** Display of temperature, humidity, wind speed, and precipitation.
- **Hourly Forecast:** Interactive 24-hour timeline with horizontal scrolling.
- **Daily Forecast:** 7-day prediction with min/max temperature tracking.
- **WMO Mapping:** Mapping system for 30+ weather conditions based on WMO codes (0-99).
- **Weekday Navigation:** Ability to select specific days for detailed forecast viewing.

### 🔍 Search & Geocoding

- **Autocomplete Search:** City lookup via Open-Meteo Geocoding API.
- **Optimization:** 300ms input debouncing to minimize unnecessary API calls.
- **History:** Session-based history of the last 5 searched cities.
- **UX:** "Click-outside" handling to automatically close the search dropdown.

### ⚙️ Unit & Settings System

- **Metric Switching:** Global unit management for:
  - Temperature (Celsius / Fahrenheit).
  - Wind Speed (km/h / mph).
  - Precipitation (mm / inch).
- **Dynamic Updates:** Real-time data conversion across the UI upon setting changes.

### 🎨 UI/UX & Design

- **Skeleton Loading:** Custom skeleton screens for all data-heavy widgets to improve perceived performance.
- **Typography:** Montserrat font integration with a structured CSS variable system.
- **Responsive Design:** Basic mobile and tablet layout optimization.

## [Unreleased]

### 🎯 Planned Roadmap

##### High Priority

1. **Type Safety:** Full typification of all server data. Eliminate `any` for `currentData` in `CurrentForecast.tsx` and other components.
2. **Public API (Shared):** Implementation of Public API for the Shared layer in every component.
3. **Focus Logic Refactoring:** Refactor the dropdown closing mechanism. Move away from the implementation using a document listener.
4. **Type Optimization (FIXME):** Audit of `RecentlySearchedCity` and `City` types. Move shared interfaces to `model/types.ts`.
5. **Persistence:** `LocalStorage` integration for saving user settings (metrics, selected city, search history).

##### Medium Priority

1. **Logic Extraction (Hooks):** Extract complex rendering and filtering logic from UI components (e.g., `SearchCity.tsx`) into custom hooks according to FSD.
2. **Error Handling:** Implementation of `Error Boundaries` and detailed `null` checks for handling API errors and empty responses.
3. **Themes:** Implementation of a dark and light theme switching system.
4. **Geolocation:** Automatic user location detection on the first launch.
5. **Favorites:** Adding "Favorite Cities" functionality.

##### Low Priority

1. **Responsiveness:** Adaptation for mobile devices and testing on 2K/4K monitors (interface scaling).
2. **i18n:** Localization of the interface into Russian.
3. **Testing:**

---

# Changelog (RU)

## [0.1.0] - 2026-01-18

### 🚀 Initial Stable Release (Weather Dashboard MVP)

Полная реализация погодного дашборда с использованием архитектуры Feature-Sliced Design (FSD). Приложение готово к работе и предоставляет полный цикл взаимодействия с данными Open-Meteo API.

### 🏗 Architecture & Core

- **FSD Implementation:** Полное разделение проекта на слои (app, pages, widgets, features, entities, shared).
- **Tech Stack:** Vite + React 19 + TypeScript 5.9.
- **Data Fetching:** Интеграция TanStack Query (v5) с кэшированием и DevTools.
- **State Management:** Сторы на Zustand для управления городами, метриками и выбранными днями.

### 🌦 Weather Features

- **Current Weather:** Отображение текущей температуры, влажности, скорости ветра и осадков.
- **Hourly Forecast:** 24-часовой прогноз с горизонтальным скроллом.
- **Daily Forecast:** Прогноз на 7 дней с детализацией min/max температур.
- **WMO Mapping:** Система маппинга погодных кодов (0-99) в иконки (30+ состояний).

### 🔍 Search & Geocoding

- **Autocomplete Search:** Поиск городов через Open-Meteo Geocoding API.
- **Optimization:** Дебаунс ввода (300мс) для сокращения API-запросов.
- **History:** Сохранение последних 5 найденных городов.

### ⚙️ Unit & Settings System

- **Metric Switching:** Переключение единиц: Цельсий/Фаренгейт, км/ч / мили/ч, мм/дюймы.
- **Dynamic Conversion:** Автоматический пересчет данных при смене настроек.

### 🎨 UI/UX & Design

- **Skeleton Loading:** Система Skeleton-экранов для всех блоков для улучшения LCP.
- **Typography:** Шрифт Montserrat и гибкая система CSS-переменных.

## [Unreleased]

### 🎯 Planned Features (Roadmap)

#### Высокий приоритет (High Priority)

1. **Type Safety:** Полная типизация всех данных с сервера. Уйти от `any` для `currentData` в `CurrentForecast.tsx` и других компонентах.
2. **Public API (Shared):** Внедрение Public API для слоя Shared в каждом компоненте.
3. **Focus Logic Refactoring:** Переписать механизм закрытия дропдаунов. Уйти от реализации со слушателем на document.
4. **Type Optimization (FIXME):** Ревизия типов `RecentlySearchedCity` и `City`. Вынос общих интерфейсов в `model/types.ts`.
5. **Persistence:** Интеграция `LocalStorage` для сохранения настроек пользователя (метрики, выбранный город, история поиска).

#### Средний приоритет (Medium Priority)

1. **Logic Extraction (Hooks):** Вынос сложной логики рендеринга и фильтрации из UI-компонентов (например, `SearchCity.tsx`) в кастомные хуки согласно FSD.
2. **Error Handling:** Внедрение `Error Boundaries` и детальных проверок на `null` для обработки ошибок API и пустых ответов.
3. **Themes:** Реализация системы переключения темной и светлой тем оформления.
4. **Geolocation:** Автоматическое определение местоположения пользователя при первом запуске.
5. **Favorites:** Добавление функционала «Избранные города».

#### Низкий приоритет (Low Priority)

1. **Responsiveness:** Адаптация под мобильные устройства и тестирование на 2K/4K мониторах (скейлинг интерфейса).
2. **i18n:** Локализация интерфейса на русский язык.
3. **Testing:** Покрытие ключевой бизнес-логики и компонентов Unit-тестами (Vitest + RTL).
4. **Notifications:** Система уведомлений или алертов о резких изменениях погоды.
