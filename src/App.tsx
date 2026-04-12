import "@/mocks/auth.mock";
import "@/mocks/onboarding.mock";
import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { AlertHost } from "./components/ui/alert-banner/alert-bus";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <AlertHost />
    </AuthProvider>
  );
}

export default App;
