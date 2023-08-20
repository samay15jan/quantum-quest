import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from './firebase'; 
import { getDatabase, ref, set } from "firebase/database";
import googleLogo from '../google-logo.jpg'
 
const AuthButtons = () => {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        const userId = user.uid
        localStorage.setItem('userId', userId)
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          name: user.displayName,
          email: user.email, 
          profile : user.photoURL
        });
      })
      .catch((error) => {
        console.error('Google login error:', error)
      });
  };

  return (
    <div>
      <button className='Google flex items-center bg-white text-black hover p-1 pr-2 rounded-full w-30 hover:bg-gray-200 drop-shadow-lg' onClick={handleGoogleLogin}><img className='w-8 mr-2' src={googleLogo} alt="Google"/>Sign in with Google</button>
    </div>
  );
};

export default AuthButtons;