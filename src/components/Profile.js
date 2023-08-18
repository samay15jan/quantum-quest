import React from 'react';
import { useUserContext } from './UserContext';
import AuthButtons from './Auth'
import Logout from './Logout'

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <AuthButtons />;
  }

  return (
    <div>
      <div className="Google py-8 pr-4 max-w-sm mx-auto bg-white rounded-full shadow-lg space-y-2 sm:py-1 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
        <img className="block mx-auto pl-2 h-12 rounded-full sm:mx-0 sm:shrink-0" src={user.profilePic} alt="Profile" />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0">
            <p className="text-sm text-black font-semibold">
              {user.name}<Logout />
            </p>
            <p className="text-xs text-slate-500 font-normal">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
