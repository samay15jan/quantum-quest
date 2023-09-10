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
      <div className='lg:block hidden absolute right-24 top-5 '>
        <button className='bg-opacity-70 flex items-center bg-white text-black p-3 pr-2 rounded-full w-30 hover:bg-gray-200 drop-shadow-lg' onClick={handleGoogleLogin}><img className='w-8 mr-2' src={googleLogo} alt="Google"/>Sign in with Google</button>
      </div>
      <div className='lg:hidden block absolute right-20 top-4'>
      <button className='bg-opacity-70 bg-white rounded-full hover:bg-gray-200 drop-shadow-lg p-1' onClick={handleGoogleLogin}><img className='w-8' src={googleLogo} alt="Google"/></button>
      </div>
    </div>
  );
};

export default AuthButtons;