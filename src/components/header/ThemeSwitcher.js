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
                <div className='absolute top-6 right-0 w-32' >
                    <button onClick={changeTheme}><i className={ICON === 'Light' ? 'fa-regular fa-moon fa-2xl bg-white rounded-full px-2 py-5' : 'fa-regular fa-sun fa-2xl bg-white px-1 py-5 rounded-full'}></i> </button>
                </div>
        </UserProvider>
    )
}

export default ThemeSwitcher