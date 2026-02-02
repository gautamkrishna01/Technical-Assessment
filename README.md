# Laboratory Services Table

A dynamic React table component displaying laboratory test services with their counts, built for a technical assessment.

## Overview

This project renders a Laboratory Services table that dynamically maps JSON API data to a structured table layout. The table displays test names organized by category with corresponding count values mapped via `priorityDe`.

## Tech Stack

- React 19 with TypeScript
- Vite (build tool)
- Tailwind CSS 4

## Project Structure

```
src/
├── components/
│   └── LaboratoryTable/
│       ├── index.ts
│       ├── LaboratoryTable.tsx
│       ├── TableSection.tsx
│       └── TableRow.tsx
├── constants/
│   └── laboratorySchema.ts
├── hooks/
│   └── usePriorityCount.ts
├── pages/
│   └── LaboratoryServices.tsx
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Data Mapping Logic

1. **JSON Data**: Contains `priorityDe` (test identifier) and `ptcount` (count value)
2. **Schema**: `laboratorySchema.ts` defines the table structure with sections and tests
3. **Mapping**: `usePriorityCount` hook creates a Map for O(1) lookup of counts by `priorityDe`
4. **Rendering**: Each test row looks up its count from the Map using its `priorityDe`

## Optimizations

- **Memoization**: Components wrapped with `React.memo` to prevent unnecessary re-renders
- **useMemo Hook**: Count map is memoized to avoid recalculation on every render
- **Single Loop**: Data is processed once into a Map structure for efficient lookups
- **Clean Architecture**: Separation of types, constants, hooks, and components

## Running the Project

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
