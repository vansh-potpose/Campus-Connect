// app/providers.jsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigation } from "./Components/Navigation";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <Navigation />
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
