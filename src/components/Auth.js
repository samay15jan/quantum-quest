import { useUserContext } from './UserContext';
import { signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { auth, database} from './firebase'; 
import GoogleShort from '../Google-logo.jpg'
 
const AuthButtons = () => {
  const { setUser } = useUserContext();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const user_name = user.displayName;
        const user_email = user.email;
        const user_profile_pic = user.photoURL;
        
        setUser({
          name: user_name,
          email: user_email,
          profilePic: user_profile_pic,
        });
      })
      .catch((error) => {
        console.error('Google login error:', error);
      });
  };
  return (
    <div>
      <button className='flex items-center bg-white text-black hover p-1 pr-2 rounded-full w-30 hover:bg-gray-200 drop-shadow-lg' onClick={handleGoogleLogin}><img className='w-8 mr-2' src={GoogleShort} alt="Google"/>Sign in with Google</button>
    </div>
  );
};

export default AuthButtons;