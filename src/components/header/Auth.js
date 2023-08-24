import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth } from '../firebase'; 
import { getDatabase, ref, set } from "firebase/database";
import googleLogo from '../../images/google-logo.jpg'
 
const AuthButtons = () => {
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        const userId = user.uid
        localStorage.setItem('userId', userId)
        const generatedKey = generateKey();
        const db = getDatabase();
        set(ref(db, 'quantum-quest/users/' + userId), {
          name: user.displayName,
          email: user.email, 
          profile : user.photoURL,
          encrypt_key: generatedKey
        });
      })
      .catch((error) => {
        console.error('Google login error:', error)
      });
  };

  function generateKey() {
    const keyLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < keyLength; i++) {
      key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
  }

  return (
    <div>
      <button className='Google flex items-center bg-white text-black hover p-1 pr-2 rounded-full w-30 hover:bg-gray-200 drop-shadow-lg' onClick={handleGoogleLogin}><img className='w-8 mr-2' src={googleLogo} alt="Google"/>Sign in with Google</button>
    </div>
  );
};

export default AuthButtons;