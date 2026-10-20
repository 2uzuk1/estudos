import "./App.css";
import { useState } from "react";
import Box from "./components/Box";

import ThemeContext from "./contexts/ThemeContext.jsx";

function App() {
  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem("theme");
    return storageTheme || "ligth";
  });

  const toggleTheme = ({ target }) => {
    const newTheme = target.checked ? "dark" : "light";

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <main className={theme}>
        <p>Texto</p>

        <Box />

        <label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
          />
          Modo escuro
        </label>
      </main>
    </ThemeContext.Provider>
  );
}

export default App;
