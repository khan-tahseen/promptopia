'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';

const Profile = () => {
  const handleDelete = async () => {
    // Perform delete operation
    console.log('Deleting profile...');
  };

  const handleEdit = () => {
    // Perform edit operation
    console.log('Editing profile...');
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={[]}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Profile;
