import { useUserContext } from '../UserContext'
import DarkLogo from '../../images/logo-dark.svg'
import LightLogo from '../../images/logo-light.svg'

const Logo = () => {
    const { finalTheme } = useUserContext();
    const getLogo = (value) => {
        const finalValue = value.finalTheme;
        if (finalValue === 'Light') {
            return LightLogo
        }
        else {
            return DarkLogo
        }
    };
    const finalDisplayLogo = getLogo(finalTheme);
    return (
        <div>
            <img className='w-56 m-2 lg:w-72 lg:m-5' src={finalDisplayLogo} alt="Logo" />
        </div>
)}

export default Logo