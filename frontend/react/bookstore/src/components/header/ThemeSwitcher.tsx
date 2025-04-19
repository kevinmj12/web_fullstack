import { useContext } from "react";
import { ThemeName } from "../../style/theme";
import { ThemeContext } from "../context/ThemeContext";

const ThemeSwitcher = () => {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        toggleTheme();
      }}
    >
      {themeName}
    </button>
  );
};

export default ThemeSwitcher;
