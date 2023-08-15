import React from 'react';
import { useUserContext } from './UserContext';

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <div class="py-8 pr-4 max-w-sm mx-auto bg-white rounded-full shadow-lg space-y-2 sm:py-1 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
        <img class="block mx-auto h-12 rounded-full sm:mx-0 sm:shrink-0" src={user.profilePic} alt="Profile" />
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-sm text-black font-semibold">
              {user.name}
            </p>
            <p class="text-sm text-slate-500 font-normal">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
