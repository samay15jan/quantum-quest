import React from 'react';
import { getDatabase, ref, child, get } from "firebase/database";
import AuthButtons from './Auth'
import Logout from './Logout'

var userEmail, userName, userProfile, encryptKey;
const Profile = () => {
  const userId = localStorage.getItem('userId')
  
  if (!userId) {
    return <AuthButtons />;
  }

  const dbRef = ref(getDatabase());
  get(child(dbRef, `quantum-quest/users/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      userEmail = userData.email;
      userName = userData.name;
      userProfile = userData.profile;
      encryptKey = userData.encrypt_key;    
    } 
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  localStorage.setItem('key', encryptKey)
  return (
    <div>
      <div className="Google py-8 pr-4 max-w-sm mx-auto bg-white rounded-full shadow-lg space-y-2 sm:py-1 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
        <img className="block mx-auto pl-2 h-12 rounded-full sm:mx-0 sm:shrink-0" src={userProfile} alt="Profile" />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0">
            <p className="text-sm text-black font-semibold">
              {userName}<Logout />
            </p>
            <p className="text-xs text-slate-500 font-normal">
              {userEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
