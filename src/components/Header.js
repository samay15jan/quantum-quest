import Logo from './Logo'
import Profile from './Profile'
import ThemeSwitcher from './ThemeSwitcher.js'

const Header = ({onAdd, showAdd}) => {
  return (
    <header className='header'>
      <Logo />
      <Profile className="Google"/>
      <ThemeSwitcher />
    </header>
  )
}

export default Header