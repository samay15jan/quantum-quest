import { useUserContext } from './UserContext';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, database} from './firebase'; 

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
      <button className='bg-amber-300 p-1 py-2 rounded-md text-slate-800' onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default AuthButtons;