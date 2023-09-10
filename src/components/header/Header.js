import Logo from './AppLogo'
import Profile from './Profile'
import ThemeSwitcher from './ThemeSwitcher.js'

const Header = () => {
  return (
    <header className='mb-100'>
      <Logo />
      <Profile/>
      <ThemeSwitcher />
    </header>
  )
}

export default Header