import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserProfile from '../components/user/UserProfile';

// Bug: Crashes on missing data
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Profile</h1>
      <UserProfile user={user} />
    </div>
  );
};

export default ProfilePage;
