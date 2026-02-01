# Тестовое задание «Редактор параметров» (React + TypeScript)

## Описание

Реализован компонент **ParamEditor**, который позволяет редактировать значения параметров товара на основе:

- списка параметров `params: Param[]` (схема полей)
- начальной модели `model: Model` (значения параметров в `model.paramValues`)

Требования задания соблюдены:

- поддерживается только текстовый тип параметра: `type: 'string'` (рендерится `<input />`)
- **все параметры** из `params` отображаются сразу и доступны для редактирования
- значения корректно инициализируются из `model.paramValues`
- публичный метод `getModel()` возвращает **полную** структуру `Model` со всеми проставленными значениями
- добавлены unit-тесты (Vitest + React Testing Library) на:
  1. отображение полей по `params`
  2. инициализацию из `model.paramValues`
  3. корректность результата `getModel()` после изменений

Основная реализация находится в одном файле:

- `src/param-editor/ParamEditor.tsx`

## Технологии

- React
- TypeScript
- Vite
- Vitest
- React Testing Library

## Установка и запуск (pnpm)

### Установка зависимостей

```
pnpm i
```

### Запуск dev-сервера

```
pnpm dev
```

### Запуск unit-тестов

```
pnpm test
```

## Как пользоваться ParamEditor

Компонент — классовый (как в примере ТЗ) и предоставляет публичный метод `getModel()`.
Самый простой способ получить модель — через `ref`.

Пример:

```tsx
import React from 'react';
import {
  ParamEditor,
  type Model,
  type Param,
} from './param-editor/ParamEditor';

const params: Param[] = [
  { id: 1, name: 'Назначение', type: 'string' },
  { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
  paramValues: [
    { paramId: 1, value: 'повседневное' },
    { paramId: 2, value: 'макси' },
  ],
  colors: [],
};

export function App() {
  const editorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    const nextModel = editorRef.current?.getModel();
    console.log(nextModel);
  };

  return (
    <div>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={handleGetModel}>getModel()</button>
    </div>
  );
}
```

## Тесты

Тесты находятся в папке `src/param-editor` и покрывают основные требования автопроверки:

- `ParamEditor.render.test.tsx`
- `ParamEditor.init.test.tsx`
- `ParamEditor.getModel.test.tsx`

### Вывод тестов

```
➜  selsup git:(feat/param-editor) pnpm test

> selsup@0.0.0 test /Users/denischernykh/projects/test-task/selsup
> vitest


 DEV  v4.0.18 /Users/denischernykh/projects/test-task/selsup

 ✓ src/smoke.test.ts (1 test) 1ms
 ✓ src/param-editor/ParamEditor.render.test.tsx (1 test) 51ms
 ✓ src/param-editor/ParamEditor.init.test.tsx (1 test) 59ms
 ✓ src/param-editor/ParamEditor.getModel.test.tsx (1 test) 163ms

 Test Files  4 passed (4)
      Tests  4 passed (4)
   Start at  18:11:32
   Duration  1.13s (transform 165ms, setup 329ms, import 538ms, tests 274ms, environment 2.27s)
```
