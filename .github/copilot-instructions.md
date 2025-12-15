## Repository snapshot

- Vite + React app scaffolded with minimal template. Key files:
  - `src/main.jsx` — app entry; wraps `<App/>` with `BrowserRouter`.
  - `src/App.jsx` — central route table (uses `react-router` routes).
  - `src/components/*` — UI components (JSX files, default exports).
  - `src/services/*` — place for API clients (`auth.js`, `movieService.js`).

## Big picture / architecture

- Single-page application using Vite dev server and React. Routing is provided at the root (`BrowserRouter` in `main.jsx`) and route definitions live in `App.jsx`.
- The project centralizes HTTP requests in `src/services` using `axios` (there is an `api` instance planned in `src/services/auth.js`). Components call service functions (example: `src/components/SignUp/SignUp.jsx` imports `signUpService` from `src/services/auth.js`).
- UI conventions: components are simple, default-exported React functions using `.jsx` files; look at `NavBar`, `BottomNavBar`, `Discover` for examples.

## Developer workflows (quick commands)

- Install dependencies: `npm install`
- Start dev server: `npm run dev` (Vite)
- Build for production: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint` (project contains `eslint.config.js` and ESLint plugins)

## Project-specific patterns & gotchas for AI agents

- Routing import: components import `Link` / `BrowserRouter` from `react-router` (not `react-router-dom`). Keep this in mind when adding routes or links.
- Services pattern: create an `axios` instance and export small functions for each endpoint (e.g. `signUpService(data)`, `loginService(creds)`). `src/services/auth.js` currently defines `const api = axios.create({ baseURL: /* TODO */ })` — prefer using `import.meta.env.VITE_API_BASE_URL` for the base URL in code examples.
  - Example (concise):
    ```js
    const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })
    export const signUpService = (payload) => api.post('/signup', payload)
    ```
- Environment variables: Vite requires `VITE_` prefix for env vars (`.env` file containing `VITE_API_BASE_URL=...`).
- Empty/placeholder files: `src/services/movieService.js` is currently empty and `src/services/auth.js` is incomplete; if you implement them, make minimal, well-scoped changes and run the app to verify.

## Examples of typical edits an agent might do

- Implement `signUpService` to match `src/components/SignUp/SignUp.jsx` expectations. Search for `signUpService` imports to ensure consistent API.
- Add API clients to `src/services/*` and keep them small (one function per endpoint). Use the shared `api` axios instance.
- Add routes in `App.jsx` and corresponding components in `src/components/`.

## Tests and CI

- There are currently **no tests** or CI configs in the repo. When adding features, also add a small test and update the README or CI if the project adopts tests later.

## When to ask the maintainer

- Confirm backend endpoint shapes and auth flows before implementing services.
- Confirm the preferred router import if you plan to migrate to `react-router-dom` (this project uses `react-router`).

## Quick references

- Route table: `src/App.jsx`
- App entry & router: `src/main.jsx`
- Services pattern: `src/services/auth.js` (incomplete but illustrative)
- Sign-up usage: `src/components/SignUp/SignUp.jsx`

— End of file —
