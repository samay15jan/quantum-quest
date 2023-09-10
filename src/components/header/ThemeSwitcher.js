import React, { useState } from 'react';
import { useUserContext, UserProvider } from '../UserContext'

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
                <div className='absolute top-4 right-5 drop-shadow-lg lg:top-5' >
                    <button onClick={changeTheme}><i className={ICON === 'Light' ? 'bg-opacity-70 fa-regular fa-moon fa-2xl bg-white rounded-full px-2 py-5 hover:bg-gray-200 lg:px-4 lg:py-7' : 'bg-opacity-70 fa-regular fa-sun fa-2xl bg-white px-1 py-5 lg:px-3 lg:py-7 rounded-full hover:bg-gray-200'}></i> </button>
                </div>
        </UserProvider>
    )
}

export default ThemeSwitcher