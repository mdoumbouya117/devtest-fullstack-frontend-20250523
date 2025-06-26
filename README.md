# Project Overview

This project is a React application that consumes a GraphQL API to display a list of countries. The goal is to progressively enhance the app by adding TypeScript support, UI improvements with Ant Design, and advanced filtering capabilities.

## 🔧 Features & Tasks

1. **Migrate to TypeScript**
   Convert all JavaScript files to TypeScript to enable static typing and improve code quality.

2. **Display a Country List**
   Fetch and render a list of countries from the GraphQL API, showing basic info like name and emoji flag.

3. **Integrate Ant Design**
   Install and configure [Ant Design](https://ant.design/) for a modern and consistent UI.

4. **Add Filtering Options**
   Implement filters to search countries by:
   - Continent
   - Currency
   - Country name (text search)

5. **Enhance Country List UI**
   Improve the list display with Ant Design components and show country flags clearly.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- `pnpm` package manager installed globally (`npm install -g pnpm`)

### Installation

1. **Install dependencies**
   ```bash
   pnpm install

2. **Start the development server**
   ```bash
   pnpm start

3. Open http://localhost:3000 in your browser to view the app.

## 📚 Advanced Features (Optional Challenges)

Tackle these tasks to go beyond the basics and enhance the app's performance, UX, and maintainability.

### 1. Pagination and Infinite Scroll
Implement pagination or infinite scrolling to load countries in chunks instead of all at once.

- Use Apollo Client's pagination helpers or manage offsets manually.
- Integrate Ant Design's `Pagination` component, or implement an infinite scroll trigger using the Intersection Observer API.

### 2. Country Details Page / Modal
Enable users to view more information about a country (e.g., capital, native name, languages).

- Option 1: Use React Router to navigate to a country details page.
- Option 2: Use an Ant Design `Modal` to show details on click without leaving the list.

### 3. Favorites / Bookmarking
Allow users to "favorite" countries.

- Use React context or `localStorage` to store favorites.
- Display a separate view for favorites, or visually highlight them in the list.

### 4. Dark Mode Toggle
Add a theme toggle button to switch between light and dark modes.

- Use Ant Design’s theming or CSS variables.
- Persist user preference using `localStorage`.

### 5. Error Handling and Loading States
Improve the user experience with clear feedback.

- Use Ant Design’s `Spin` for loading indicators.
- Show `Alert` messages for errors and optionally provide a retry mechanism.

### 6. Sorting Options
Add sorting capabilities to the country list.

- Alphabetical (A–Z / Z–A)
- By population or area (if available from the API)
- Sorting can be done client-side.

### 7. Accessibility Improvements
Ensure the app is accessible for all users.

- Improve keyboard navigation and focus states.
- Add `aria` labels and roles where necessary.
- Validate with tools like [axe](https://www.deque.com/axe/).

---

## ✅ Bonus: Unitary & Integration Testing

Introduce testing to increase confidence in the app’s stability.

- Use **React Testing Library** for rendering and interaction tests.
- Use **Jest** for running unit tests and assertions.
- Suggested test cases:
  - Renders a list of countries
  - Filters by continent, currency, or name
  - Handles loading and error states correctly
  - Favorites logic (add/remove)
  - Modal or detail page display
