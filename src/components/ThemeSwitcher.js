import React, { useState } from 'react';
import { useUserContext, UserProvider } from './UserContext'

const ThemeSwitcher = () => {
    const { finalTheme, setTheme } = useUserContext();
    const [theme, setThemeState] = useState("Light")
    const changeTheme = () => {
        const newTheme = theme === "Dark" ? "Light" : "Dark";
        setThemeState(newTheme);
        setTheme({ finalTheme: newTheme });
    }
    const icon = (value)=> {
        const finalValue = value.finalTheme
        return finalValue
    }
    const ICON = icon(finalTheme);
    return (
        <UserProvider>
                <button className='rounded-full p-2 mr-5' onClick={changeTheme}><i className={ICON === 'Light' ? 'fa-regular fa-moon fa-xl ' : 'fa-regular fa-sun fa-2xl text-white'}></i> </button>
        </UserProvider>
    )
}

export default ThemeSwitcher