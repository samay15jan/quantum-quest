import Button from './Button'
import Theme from './Theme'
import AuthButtons from './Auth'
import Profile from './Profile'
import Logout from './Logout'

const Header = ({onAdd, showAdd}) => {
  return (
    <header className='header'>
      <Theme />
      <AuthButtons />
      <Profile />
      <Logout />
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

export default Header