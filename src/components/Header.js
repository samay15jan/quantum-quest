import Logo from './Logo'
import AuthButtons from './Auth'
import Profile from './Profile'
import ThemeSwitcher from './ThemeSwitcher.js'
import Logout from './Logout'
import Button from './Button'

const Header = ({onAdd, showAdd}) => {
  return (
    <header className='header'>
      <Logo />
      <AuthButtons />
      <Profile />
      <ThemeSwitcher />
      <Logout />
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

export default Header