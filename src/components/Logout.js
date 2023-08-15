import { signOut } from 'firebase/auth';
import { auth } from './firebase'; 

const Logout = () => {
    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            console.log('User Successfully logged out');
          })
          .catch((error) => {
            console.error('Logout error:', error);
          });
    };

    return (
        <button class="px-2 py-2 text-sm text-red-600 font-semibold rounded-md border border-purple-200 hover:text-white hover:bg-red-600 hover:border-transparent" onClick={handleLogout}>Logout</button>
    );
}

export default Logout;