import React, { useContext } from "react";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

import ThemeSwitcher from "./components/header/ThemeSwitcher";
import {
  BookStoreThemeProvider,
  ThemeContext,
} from "./components/context/ThemeContext";

function App() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
