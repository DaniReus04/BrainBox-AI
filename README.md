# BrainBox AI

BrainBox AI is a technical assessment project that implements an AI-powered assistant interface for a fictional fintech company. The application provides a complete user experience including authentication, onboarding, and a conversational AI chat powered by a configurable LLM API (OpenAI or OpenRouter-compatible).

## Features

- User authentication with register and login flows (mocked via Axios interceptors)
- Guided onboarding flow
- AI chat assistant with persistent history
- Internationalization (i18n) with automatic language detection
- Light and dark theme support
- Responsive layout with bottom navigation

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build tool:** Vite 8
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 4
- **HTTP client:** Axios
- **Validation:** Yup
- **Internationalization:** i18next
- **Testing:** Vitest, Testing Library, Playwright
- **Component explorer:** Storybook 10
- **Linting / formatting:** Biome

## Prerequisites

- Node.js 22 or higher (tested on v22.22.2) — use [nvm](https://github.com/nvm-sh/nvm) and run `nvm use` at the project root to automatically switch to the correct version
- npm 10 or higher (tested on v10.9.7)

## Environment Setup

Copy the `.env.example` file to `.env` at the project root and fill in the required values:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `VITE_OPENAI_API_KEY` | Yes | API key used to authenticate with the LLM provider |
| `VITE_OPENAI_MODEL` | No | Model identifier (defaults to `gpt-4o-mini`) |
| `VITE_OPENAI_API_URL` | No | Chat completions endpoint (defaults to the OpenAI API) |

The `.env.example` file is pre-configured to use [OpenRouter](https://openrouter.ai), which provides free-tier model access. To use it, create a free account at [openrouter.ai](https://openrouter.ai), generate an API key, and set `VITE_OPENAI_API_KEY` to that key.

If you prefer to use the OpenAI API directly, set `VITE_OPENAI_API_KEY` to your OpenAI key and leave `VITE_OPENAI_API_URL` unset.

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Available Scripts

| Script | Description |
|---|---|
| `dev` | Start the development server |
| `build` | Type-check and build for production |
| `preview` | Preview the production build locally |
| `test` | Run tests in watch mode |
| `test:run` | Run tests once (CI mode) |
| `test:coverage` | Run tests and generate a coverage report |
| `lint` | Run Biome checks |
| `lint:fix` | Run Biome checks and apply auto-fixes |
| `format` | Format all files with Biome |
| `sb` | Start Storybook on port 6006 |
| `build-sb` | Build a static Storybook |

## Project Structure

```
src/
  app/           # Router configuration
  assets/        # Static images and illustrations
  components/    # Reusable UI components
  constants/     # Application-level constants
  context/       # React context providers
  hoc/           # Higher-order components (auth guards)
  lib/           # Utility helpers (e.g. cn)
  mocks/         # Axios interceptors for mocked API responses
  pages/         # Page-level components organized by route
  services/      # API and business logic services
  utils/         # Shared utilities (i18n, theme, hashing, cookies)
```
