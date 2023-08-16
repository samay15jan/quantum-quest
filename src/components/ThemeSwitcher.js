import React, { useState } from 'react';
import { useUserContext } from './UserContext'

const ThemeSwitcher = () => {
    const { setTheme } = useUserContext();
    const [theme, setThemeState] = useState("Light")
    const changeTheme = () => {
        const newTheme = theme === "Dark" ? "Light" : "Dark";
        setThemeState(newTheme);
        setTheme({ finalTheme: newTheme });
    }
    return (
        <button onClick={changeTheme}>Theme</button>
    )
}

export default ThemeSwitcher