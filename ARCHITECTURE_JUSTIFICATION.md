# Architecture & Structural Justification

## 1. Component Architecture & UI Structure
The Front-End application follows a Single Page Application (SPA) architecture utilizing React and Vite. 
- **Modularity:** Components are actively split based on their functional footprint (`Alerts`, `AuditLogs`, `ClientForm`, `Dashboard`). These are imported conditionally into the main layout inside `App.jsx`.
- **Higher-Order Structuring:** The application relies on an encompassing routing layout. Using `framer-motion`, route changes (`AnimatedRoutes`) happen cleanly, improving the perceived performance of the app.

## 2. State Management & Controlled Components
- **Top-Down Data Flow:** All critical business data (`submissions`, `logs`) and authentication identity (`currentUser`) is hoisted entirely into the parent container (`App.jsx`). This allows derived states (like calculation of pending or rejected tickets) to occur globally, rather than causing data-sync issues across siblings.
- **Controlled Forms:** Complex forms such as `Login.jsx` and `ClientForm.jsx` are strictly controlled React components. No direct DOM polling occurs. State drives the `value` of all fields natively.

## 3. Asynchronous APIs and Promises
Instead of hardcoding the synchronous returns directly, the data pipeline natively supports JS Promises. 
- `apiService/mockService.js` simulates realistic network latency, enabling `App.jsx` to trigger a widespread **Loading State** curtain while pulling initial payloads.
- **Error Boundaries:** The API gracefully checks constraints and propagates errors to the global component context, which acts effectively as an error boundary, offering retry capabilities natively without crashing the application interface.

## 4. Accessibility & Routing
- Interactive elements leverage HTML5 semantics (`<aside>`, `<main>`, `<header>`). 
- **ARIA Assertions:** Input tags and interactable dropdowns are mapped accurately. Forms utilize attributes like `aria-required`, `aria-label`, and `htmlFor` ensuring screen reader context logic applies accurately to the `<ClientForm>`.
- Client-side Routing ensures rapid transitions without incurring full unmount payloads.

## 5. Performance Context & Trade-Offs
- **Trade-Off (Global State Context vs Redux):** For an application of this scale, setting up `Redux Toolkit` or `Zustand` would incur unnecessary boilerplate. React's native `useState` bindings mapped carefully at the `App.jsx` scope effectively simulates an application Context without risking significant redraw lagging (since the node footprint is restricted).
- **Tooling:** Vite drastically enhances HMR (Hot Module Reload) velocity in development over traditional Create-React-App webpack bundlers, granting highly performant build mechanics. Unit tests run natively against a mocked JS-DOM environment via `Vitest`. 
