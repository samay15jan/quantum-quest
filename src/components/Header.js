import Logo from './Logo'
import Profile from './Profile'
import ThemeSwitcher from './ThemeSwitcher.js'
import Button from './Button'

const Header = ({onAdd, showAdd}) => {
  return (
    <header className='header'>
      <Logo />
      <Profile />
      <ThemeSwitcher />
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

export default Header