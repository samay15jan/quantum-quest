import Logo from './Logo'
import Profile from './Profile'
import ThemeSwitcher from './ThemeSwitcher.js'
import Github from './Github'

const Header = () => {
  return (
    <header className='header'>
      <Logo />
      <Profile className="Google"/>
      <ThemeSwitcher />
      <Github />
    </header>
  )
}

export default Header