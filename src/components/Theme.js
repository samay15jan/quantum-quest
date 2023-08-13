import PropTypes from 'prop-types'
import React, { useState } from 'react';
import DarkLogo from '../logo-dark.svg'
import LightLogo from '../logo-light.svg'

const Theme = ({}) => {
    const [logo, setLogo] = useState(LightLogo)
    const changeTheme = () => {
        setLogo((currentLogo) => (currentLogo === DarkLogo ? LightLogo : DarkLogo))
    }
    return (
        <div>
            <img className='w-56 m-2 lg:w-72 lg:m-5' src={logo} alt="Logo" />
            <button onClick={changeTheme}>Change Theme</button>
        </div>

)
}

export default Theme