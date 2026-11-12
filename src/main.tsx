import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import "./index.css";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  </StrictMode>,
);
