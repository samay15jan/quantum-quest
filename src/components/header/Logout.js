import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 

const Logout = () => {

  const handleLogout = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem('userId');
          localStorage.removeItem('key');
          localStorage.removeItem('username');
        })
        .catch((error) => {
        console.error('Logout error:', error);
      });
    };

    return (
        <button className="px-2 py-2 text-black text-xs hover:text-red-600" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i></button>
    );
}

export default Logout;