import { createContext, useContext, useEffect, useState } from "react";
import { themes } from "./themes";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
    const savedTheme = localStorage.getItem("themeIndex");
    const initialTheme = savedTheme ? Number(savedTheme) : 0;
    const [themeIndex, setThemeIndex] = useState(initialTheme);
 
    useEffect(() => {
    const theme = themes[themeIndex];
    localStorage.setItem("themeIndex", themeIndex);

      document.documentElement.setAttribute("data-theme", theme.className);
    }, [themeIndex]);
    
    const handleThemeChange = () => {
        setThemeIndex((prev) => (prev + 1) % themes.length);
    };

    return (
        <ThemeContext.Provider value={{ theme: themes[themeIndex] || themes[0], handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
    
}

export function useTheme() {
    return useContext(ThemeContext);
};