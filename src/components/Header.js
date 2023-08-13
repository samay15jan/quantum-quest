import PropTypes from 'prop-types'
import Button from './Button'
import Theme from './Theme'

const Header = ({onAdd, showAdd, changeTheme}) => {
  return (
    <header className='header'>
      <Theme />
      <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
  title: 'Quantum Quest',
}

Header.proptype = {
  title: PropTypes.string.isRequired,
}

export default Header