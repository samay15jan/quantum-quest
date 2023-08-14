import Button from './Button'
import Theme from './Theme'
import AuthButtons from './Auth'
import Profile from './Profile'

const Header = ({onAdd, showAdd}) => {
  return (
    <header className='header'>
      <Theme />
      <AuthButtons />
      <Profile />
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

export default Header