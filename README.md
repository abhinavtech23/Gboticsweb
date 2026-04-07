# GBOTICS - Premium Futuristic Website

A high-end, premium deep-tech website built for GBOTICS. It features a dark theme, neon accents, interactive 3D elements (Spline), smooth premium scrolling (Lenis), and highly customized Framer Motion animations.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + PostCSS
- **Language**: TypeScript
- **Primitives**: shadcn/ui
- **Animations & Effects**: Framer Motion, Lenis Smooth Scroll, Spline 3D

---

## Getting Started

Follow these instructions to set up and run the project locally on your machine.

### 1. Prerequisites
Make sure you have Node.js installed (version 18+ recommended). 

### 2. Install Required Libraries
Before running the application, you need to install the dependencies. Run the following command in your terminal at the project root (`gboticsweb`):

```bash
npm install
```

If you ever need to manually install the specific animation, UI, and utility libraries that power this website, you can run:

```bash
npm install framer-motion motion clsx tailwind-merge class-variance-authority @radix-ui/react-slot lucide-react @splinetool/runtime @splinetool/react-spline lenis
```

*(Note: These are already saved in the `package.json` so a simple `npm install` handles them all).*

### 3. Run the Website Locally
Once the installation finishes, you can start the development server by running:

```bash
npm run dev
```

### 4. View the Site
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## Project Structure
- **`src/app/`**: Contains the page routes (`/`, `/products`, `/about`) and the global layout.
- **`src/app/globals.css`**: Global styles, Tailwind imports, and custom animation keyframes.
- **`src/components/ui/`**: Reusable interactive components like animated docks, glow cards, orbital timelines, and background boxes.
- **`src/components/sections/`**: Page-specific, large block components (e.g., Hero, Features, Showcase).
- **`src/components/navigation/`**: The Navbar and Footer components.
- **`src/components/core/`**: Core behavior wrappers, like the Lenis `smooth-scroller.tsx`.
