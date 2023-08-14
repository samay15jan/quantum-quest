import React from 'react';
import { useUserContext } from './UserContext';

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <img src={user.profilePic} alt="Profile" />
    </div>
  );
};

export default Profile;
