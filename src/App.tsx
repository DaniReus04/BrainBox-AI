import "@/mocks/auth.mock";
import "@/mocks/onboarding.mock";
import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AlertHost } from "./components/ui/alert-banner/alert-bus";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AlertHost />
    </>
  );
}

export default App;
