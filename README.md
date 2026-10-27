# HelpingHands

A frontend prototype for a student-focused, location-based psychologist finder —
built from a Design Thinking faculty interview (ADS336) identifying delays students
face finding professional mental health support, and the manual referral workload
this creates for faculty.

**This is a design prototype, not a real medical or booking service.** All
psychologist profiles, reviews, and ratings are fictional demo data.

## Tech stack

- React 19 + Vite
- Tailwind CSS
- React Router
- Lucide React icons
- Local mock data + React state + `localStorage` (no backend)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, search, problem framing, features, how it works, faculty workload section, resource preview, emergency link |
| `/find` | Psychologist Finder — search, filters, sorting, loading/empty states |
| `/match` | Smart Match — preference-based demo recommendation flow |
| `/psychologist/:id` | Psychologist profile |
| `/book/:id` | Multi-step appointment booking (requires demo login) |
| `/appointments` | My Appointments — upcoming/past, cancel (requires demo login) |
| `/resources` | Searchable mental wellness resource library |
| `/resources/:id` | Resource article detail |
| `/emergency` | Emergency support guidance |
| `/about` | Product story, Design Thinking origin, privacy principles |
| `/login`, `/register` | Demo authentication |

## Demo-only functionality

- **Authentication** is a local demo session (`localStorage`) — any valid-looking
  email + 4+ character password works. No real account or password security.
- **Appointments** persist in `localStorage` on the current device/browser only.
- **Psychologist profiles, reviews, and ratings** are entirely fictional.
- **Smart Match** is a transparent preference-scoring heuristic, not a clinical or
  AI recommendation engine.
- **Emergency Support** page provides configurable placeholders, not real hotline
  numbers, since these vary by country/region.
