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
      userEmail = userData.email
      userName = userData.name
      userProfile = userData.profile
      encryptKey = userData.encrypt_key
    } 
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  localStorage.setItem('key', encryptKey)
  localStorage.setItem('username', userName)

  return (
    <div>
      <div className="bg-opacity-70 hover:bg-gray-100 absolute top-4 right-20 lg:top-5 lg:right-24 drop-shadow-lg lg:py-2 lg:pr-4 max-w-sm mx-auto bg-white rounded-full shadow-lg sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
        <img className="lg:block hidden mx-auto lg:pl-2 lg:h-12 rounded-full sm:mx-0 sm:shrink-0" src={userProfile} />
        <div className="lg:block hidden text-center space-y-2 sm:text-left lg:block">
          <div className="space-y-0">
            <p className="text-sm text-black font-semibold">
              {userName}<Logout />
            </p>
            <p className="text-xs text-slate-500 font-normal ">
              {userEmail}
            </p>
          </div>
        </div>
        <div className='lg:hidden block flex'>
          <img className="mx-auto h-11 rounded-full p-1" src={userProfile} />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Profile;