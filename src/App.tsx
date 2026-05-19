import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Privacy = lazy(() => import("./pages/Privacy"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
