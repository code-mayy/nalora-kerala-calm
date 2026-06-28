# Nalora Kerala Calm - Documentation

Welcome to the comprehensive documentation for the **Nalora Kerala Calm** website and portal. This document covers the system architecture, technology stack, directory structure, detailed page walkthroughs, and functional flows for both patient and doctor roles.

---

## 1. Technical Stack Overview

The application is built using a modern, performant, and type-safe frontend stack utilizing **TanStack Start**:

*   **Core Framework**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
*   **Routing & SSR**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (hybrid SSR/SPA framework built on top of Vite and Nitro)
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` compiler integration.
*   **State & Data Fetching**: 
    *   [React Context API](https://react.dev/reference/react/createContext) for global client-side state (specifically Authentication).
    *   [TanStack React Query (v5)](https://tanstack.com/query/latest) for server state management and asynchronous data fetching.
*   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) schemas.
*   **UI Components**: Primitive layers built using [Radix UI](https://www.radix-ui.com/) accessible primitives and styled with Tailwind utility classes.
*   **Icons**: [Lucide React](https://lucide.dev/).

---

## 2. Directory Structure

Here is an overview of the key folders and files in the project:

```text
├── .tanstack/                  # TanStack compiler outputs
├── src/
│   ├── assets/                 # Images, logos, and static illustrations
│   ├── components/
│   │   ├── ui/                 # Reusable, design-system compliant UI primitives (buttons, inputs, dialogs)
│   │   └── InnerNav.tsx        # Secondary navigation bar used across various pages
│   ├── context/
│   │   └── AuthContext.tsx     # Context provider managing authentication state (user, roles, login/logout)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Shared library files, helper functions, and clients
│   ├── routes/                 # File-based routing folder (maps directly to URLs)
│   │   ├── doctor/             # Sub-routes restricted to healthcare providers
│   │   │   ├── dashboard.tsx   # Doctor's central command center
│   │   │   ├── diary-all.tsx   # List of all patient journals/diaries
│   │   │   ├── diary-patient.tsx # Detailed journals of a single patient
│   │   │   ├── google-calendar.tsx # Google calendar synchronization settings
│   │   │   ├── meeting-detail.tsx # Live meeting view, video links, notes, prescription interface
│   │   │   └── meetings.tsx    # List of upcoming and past meetings
│   │   ├── __root.tsx          # Root layout shell wrapper containing global components (headers, footer, router outlet)
│   │   ├── index.tsx           # Home landing page of Nalora Kerala Calm
│   │   ├── about.tsx           # About Us page highlighting values and history
│   │   ├── services.tsx        # Directory of mental wellness/therapeutic services
│   │   ├── doctors.tsx         # List of certified therapists and specialists
│   │   ├── book-session.tsx    # Booking flow and calendar selector for therapy sessions
│   │   ├── bookings.tsx        # User's scheduled sessions list
│   │   ├── contact.tsx         # Reach out forms, clinic location, and support details
│   │   ├── create-account.tsx  # User registration form
│   │   ├── login.tsx           # Login page supporting both patients and doctor credentials
│   │   ├── ai-chat.tsx         # Self-guided wellness companion / AI Chat therapist assistant
│   │   └── feedback.tsx        # Patient satisfaction feedback submission page
│   ├── router.tsx              # Router initialization module
│   ├── routeTree.gen.ts        # Auto-generated route configuration map (compiled by TanStack Router)
│   ├── server.ts               # Nitro SSR entry point configuration
│   ├── start.ts                # Client hydration configuration
│   └── styles.css              # Global custom CSS styles and Tailwind imports
```

---

## 3. Session & Authentication Flow

Authentication is managed client-side using `AuthContext.tsx` and persists across routes.

1. **Roles Supported**:
    *   **Patient**: Standard users who seek counseling, book sessions, view logs, and access AI chat.
    *   **Doctor / Provider**: Clinical professionals who view patient journals, manage meetings, and record consultation notes.
2. **Persistence**:
    *   Authentication status is stored in local state and validated against backend session endpoints.
3. **Route Guards**:
    *   Routes under `/doctor/*` require authentication checks inside the component lifecycle. Users attempting to access doctor routes without doctor credentials are redirected to the `/login` route.

---

## 4. Page Walkthrough & Functional Flow

### Patient/Guest Facing Pages

#### Home Page (`/` -> `src/routes/index.tsx`)
*   **Function**: Primary portal landing page. Introduces the "Nalora Kerala Calm" mission.
*   **Key Sections**: Hero introduction, quick navigation to services, wellness test prompts, and therapist listings.

#### About Page (`/about` -> `src/routes/about.tsx`)
*   **Function**: Contains information about the medical advisory team, core principles, and the center's origins.

#### Services Page (`/services` -> `src/routes/services.tsx`)
*   **Function**: Lists therapeutic domains like Individual Counseling, Group Therapy, Mindfulness, Stress Management, etc.

#### Doctors Directory (`/doctors` -> `src/routes/doctors.tsx`)
*   **Function**: Displays certified wellness doctors and therapists, including details of their experience, languages spoken, and availability. Includes a quick action to book a session.

#### Book Session Flow (`/book-session` -> `src/routes/book-session.tsx`)
*   **Function**: Guided booking scheduler.
*   **Flow**:
    1. Select a specialization or specific doctor.
    2. Choose an available slot (date and time).
    3. Input primary reasons for the consultation.
    4. Confirm booking. Saves session to patient's bookings.

#### Bookings (`/bookings` -> `src/routes/bookings.tsx`)
*   **Function**: Dashboard showing the logged-in patient's scheduled therapy appointments (upcoming and history), session status (confirmed/pending), and direct links to join calls.

#### AI Companion Chat (`/ai-chat` -> `src/routes/ai-chat.tsx`)
*   **Function**: Interactive chatbot that acts as a mental wellness self-care tool.
*   **Features**: Provides instant conversational support, stress-relief exercises, and redirects users to actual doctors if urgent clinical intervention is required.

#### User Authentication (`/login` & `/create-account`)
*   **Function**: Sign up new patients or log in existing users (patients & doctors). Handles token exchanges and stores local user sessions.

---

### Doctor Portal (Restricted to Doctor Role)

#### Doctor Dashboard (`/doctor/dashboard` -> `src/routes/doctor/dashboard.tsx`)
*   **Function**: Central control panel for counselors.
*   **Features**: Displays today's agenda, quick summaries of pending reviews, and stats showing total hours consultated or patients managed.

#### Meetings Manager (`/doctor/meetings` -> `src/routes/doctor/meetings.tsx`)
*   **Function**: Chronological view of all appointments. Doctors can filter meetings by status (upcoming, completed, cancelled) and launch them directly.

#### Meeting Detail (`/doctor/meeting-detail` -> `src/routes/doctor/meeting-detail.tsx`)
*   **Function**: Active session view.
*   **Features**:
    *   WebRTC or video meeting frame integration.
    *   Side-panel for live consultation note-taking.
    *   Prescription generator (saves diagnostic advice, drug listings, and therapeutic recommendations).

#### Patient Diaries & Journals (`/doctor/diary-all` & `/doctor/diary-patient`)
*   **Function**: Clinical tool for tracking patient moods and mental state over time.
*   **Features**: Patients submit regular journal entries. Doctors can view all entries (`diary-all`) or filter by a specific patient (`diary-patient`) to spot mood trends and prepare for upcoming sessions.

---

## 5. Development & Deployment Flow

### Local Development Setup
1. **Install Dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```
2. **Start Dev Server**:
   ```bash
   npm run dev
   ```
3. **Build Code for Production**:
   ```bash
   npm run build
   ```
4. **Preview Build**:
   ```bash
   npm run preview
   ```

### Code Guidelines
*   **Routing Updates**: When adding a new page, create a `.tsx` file inside `src/routes/`. The TanStack router plugin automatically detects this and updates `src/routeTree.gen.ts`.
*   **Global Components**: The navigation header and footer are housed in `src/routes/__root.tsx` to remain constant across pages. For pages requiring custom menu options (like the Doctor Dashboard), the `InnerNav.tsx` component is dynamically injected.
*   **Styles**: Style custom elements using utility classes from Tailwind CSS. Custom global rules are specified in `src/styles.css`.
