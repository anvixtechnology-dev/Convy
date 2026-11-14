import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
import "./kit/page.css";
import "./fx/fx.css";
import { Layout } from "./components/layout/Layout";
import {
  FAQPage,
  HomePage,
  LegalPage,
  NotFoundPage,
  PlatformPage,
  PricingPage,
  ProductPage,
  SecurityPage,
  SolutionsPage,
} from "./pages/Pages";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/index.html", element: <HomePage /> },
      { path: "/product", element: <ProductPage /> },
      { path: "/platform", element: <PlatformPage /> },
      { path: "/solutions", element: <SolutionsPage /> },
      { path: "/security", element: <SecurityPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/faq", element: <FAQPage /> },
      { path: "/privacy", element: <LegalPage title="Privacy" /> },
      { path: "/terms", element: <LegalPage title="Terms" /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

/*
 * The React root is a detached element: the Layout portals header.nav, main and footer.closing
 * straight into <body>, the page shell the taste-skill kit and its checks expect (no wrapper div).
 * React listens for events on the portal's container (body), so every handler still runs.
 */
createRoot(document.createElement("div")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);
