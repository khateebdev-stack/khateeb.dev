# Software Requirements Specification (SRS)
## Project Name: LearnFlow - Gamified Learning Management System (LMS)

---

## 1. Executive Summary
**LearnFlow** is a modern, interactive Learning Management System (LMS) designed for creators and educators. Unlike boring, static course platforms, LearnFlow uses **Gamification** (XP, Badges, Leaderboards) to keep students addicted to learning. It features high-performance video streaming, interactive coding quizzes, and automated certificate generation.

**Target Audience:** Course Creators, Coding Bootcamps, Corporate Training.
**Core Value:** "Udemy meets Duolingo - Make Learning Addictive."

---

## 2. User Personas & Stories

### **Persona A: Alex (The Creator)**
*   **Problem:** Losing students because his course is just a folder of long videos.
*   **Goal:** Create an engaging experience where students actually finish the course.
*   **User Story:** "As a creator, I want to add a quiz after every video to ensure students understood the concept before moving on."

### **Persona B: Sarah (The Student)**
*   **Problem:** Gets bored easily and drops out of courses.
*   **Goal:** Feel a sense of progress and achievement.
*   **User Story:** "As a student, I want to earn a 'React Master' badge and see my name on the leaderboard when I finish a module."

---

## 3. Functional Requirements

### **3.1. Course Management (Creator)**
*   **FR-01:** **Drag & Drop Builder:** Creators can organize chapters and lessons using a drag-and-drop interface.
*   **FR-02:** **Video Hosting:** Integration with Mux or UploadThing for fast video streaming.
*   **FR-03:** **Rich Text Content:** Lessons can include text, code snippets, and downloadable resources.

### **3.2. Learning Experience (Student)**
*   **FR-04:** **Progress Tracking:** Visual progress bars for each course and chapter.
*   **FR-05:** **Interactive Quizzes:** Multiple choice and "Fill in the blank" quizzes that block progress until passed.
*   **FR-06:** **Video Player:** Custom player with "Mark as Complete" and "Auto-play next" features.

### **3.3. Gamification Engine**
*   **FR-07:** **XP System:** Students earn XP for watching videos and passing quizzes.
*   **FR-08:** **Badges:** Unlockable badges (e.g., "7 Day Streak", "Quiz Whiz").
*   **FR-09:** **Leaderboard:** A weekly leaderboard showing top students in the course.

### **3.4. Monetization & Certification**
*   **FR-10:** **Payments:** Stripe Checkout for purchasing courses.
*   **FR-11:** **Certificates:** Automatically generate a PDF certificate with the student's name upon 100% completion.

---

## 4. Technical Architecture

### **Frontend (Next.js 14)**
*   **Framework:** Next.js App Router.
*   **Styling:** Tailwind CSS + Shadcn UI.
*   **State:** Zustand (for tracking video progress locally).
*   **Video:** Mux Player (React).

### **Backend (Serverless)**
*   **Database:** PostgreSQL (via Neon or Supabase).
*   **ORM:** Prisma.
*   **Auth:** Clerk (for easy social login and user management).
*   **Uploads:** UploadThing.

### **Gamification Logic**
*   **Events:** Database triggers that calculate XP whenever a `UserProgress` record is updated.
*   **Real-time:** Optimistic UI updates to show XP gain instantly.

---

## 5. Implementation Process

### **Phase 1: The "Structure" (Days 1-4)**
1.  Setup Prisma Schema (Course, Chapter, Lesson, UserProgress).
2.  Build the Course Sidebar (Navigation).
3.  Implement Clerk Authentication.

### **Phase 2: The "Content" (Days 5-8)**
1.  Integrate Mux for video processing.
2.  Build the Video Player component.
3.  Create the "Mark as Complete" logic.

### **Phase 3: The "Fun" (Days 9-12)**
1.  Implement the Quiz system.
2.  Add the Confetti animation on lesson completion.
3.  Build the Certificate generation (using `jspdf`).

---

## 6. AI Prompts (For Development)

### **A. System Prompt for Database Design**
> "Act as a Database Architect. I am building an LMS like Udemy. Design a Prisma Schema. I need models for `Course`, `Category`, `Chapter`, `Lesson`, `MuxData`, `UserProgress`, and `Purchase`. Explain the relationships. How do we track if a user has completed a specific lesson?"

### **B. Prompt for Video Player Component**
> "Create a React component called `CoursePlayer`. It should use `@mux/mux-player-react`. It needs to handle the `onEnded` event to automatically trigger a 'confetti' explosion and mark the lesson as complete via a Server Action. Use `react-confetti`."

---

## 7. Visual Assets Prompts

### **A. Thumbnail (Marketing)**
> **Prompt:** "A vibrant, colorful YouTube thumbnail. **Left:** A boring, grey classroom with a 'Bored' emoji. **Right:** A glowing, futuristic laptop screen showing the LearnFlow interface with badges and fireworks. **Text:** 'MAKE LEARNING ADDICTIVE'. High energy, purple and orange gradient."

### **B. UI Mockup (Course Page)**
> **Prompt:** "A high-fidelity UI of a video course player. **Main:** Large video player. **Sidebar:** Dark mode list of chapters with checkmarks. **Bottom:** A 'Quiz' card overlay asking a question. **Style:** Dark mode, purple accents, very sleek (like Twitch or YouTube)."
