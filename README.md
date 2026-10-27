<div align="center">

HelpingHands 🌿
Making the first step toward mental-wellness support feel easier.
A student-focused frontend prototype for discovering psychologists, exploring wellness resources, and navigating a guided appointment-booking experience.

Built with React · Vite · Tailwind CSS
</div>

[!IMPORTANT]
Prototype only — not a real healthcare, emergency, or appointment service. Psychologist profiles, reviews, and ratings are fictional demo data. Authentication and appointments are simulated locally. Do not use this project to seek medical care or emergency assistance.

💡 The idea
HelpingHands was developed from a Design Thinking faculty interview for ADS336. The project explores two related challenges: students may face delays when trying to find professional mental-health support, while faculty may spend time manually directing students toward suitable resources.

The prototype explores how a clear, student-friendly interface could make the discovery process easier and reduce friction in navigating support options.
✨ Features
- Psychologist finder — browse demo profiles with search, filters, sorting, and loading or empty states.
- Smart Match — explore a preference-based recommendation flow using a transparent scoring heuristic.
- Psychologist profiles — view fictional profile details, reviews, and ratings.
- Appointment flow — step through a demo booking process and view or cancel locally saved appointments.
- Wellness resource library — search resources and open individual resource pages.
- Emergency support page — an interface for displaying region-specific support guidance; current contact details are placeholders.
- Demo authentication — explore login and registration flows without a backend.
- Responsive interface — a student-oriented experience built with reusable React components.
🧭 Pages and routes
Route	Purpose
/	Landing page, project introduction, search, features, and resource preview
/find	Search and filter psychologist demo profiles
/match	Preference-based Smart Match flow
/psychologist/:id	View a psychologist demo profile
/book/:id	Multi-step demo appointment booking
/appointments	View or cancel locally saved demo appointments
/resources	Browse and search wellness resources
/resources/:id	Read an individual resource
/emergency	View emergency-support guidance placeholders
/about	Project background, Design Thinking origin, and privacy principles
/login	Demo login
/register	Demo registration


🛠️ Tech stack
- React 19 — component-based user interface
- Vite — development server and build tooling
- Tailwind CSS — styling
- React Router — client-side navigation
- Lucide React — interface icons
- React state and localStorage — local demo interactions and persistence
Backend: None. The prototype uses local mock data and browser storage.

🚀 Getting started
Prerequisites
Install a current version of Node.js (which includes npm).
1. Clone the repository
git clone <your-repository-url>
cd HelpingHands
Replace <your-repository-url> with your GitHub repository URL.
2. Install dependencies
npm install
3. Start the development server
npm run dev
Open the local URL printed in the terminal, usually http://localhost:5173.
4. Create a production build
npm run build
To preview the generated build locally:
npm run preview

🧪 Understanding the demo behavior
- Login and registration: a local demo session is stored in localStorage. The prototype accepts a valid-looking email and a password of four or more characters; this is not secure authentication.
- Appointments: demo bookings are saved in the current browser's localStorage. They are not sent to a server and will not sync between devices.
- Profiles, reviews, and ratings: fictional content used for demonstration.
- Smart Match: a preference-scoring heuristic, not an AI model, clinical assessment, or professional recommendation.
- Emergency support: contact information is placeholder content and must be replaced with verified local resources before any real-world use.

🔒 Privacy and safety
This project is a frontend design prototype. It does not connect to a backend or provide secure account management, clinical services, or real appointment scheduling. Avoid entering sensitive personal or health information. Any data stored by the demo remains in the browser's local storage until cleared.

If the project is developed beyond a prototype, it will need appropriate privacy safeguards, secure authentication, verified provider information, reliable booking infrastructure, and reviewed emergency-support content.

🗺️ Potential next steps
- Connect a secure backend and database.
- Add authenticated user accounts and server-side appointment management.
- Replace fictional profiles with verified provider information and consent-based reviews.
- Add accessible form validation and improve keyboard and screen-reader support.
- Replace emergency placeholders with verified, region-appropriate resources.
- Add automated tests and deployment instructions.

📄 License
No license is specified in this README. Add a LICENSE file once the project team has decided how the code may be used, modified, and redistributed.
