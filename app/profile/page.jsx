'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

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
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default MyProfile;
