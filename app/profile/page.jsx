'use client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const router = useRouter();
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

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
        } else {
          alert('Failed to delete the post');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the post');
      }
    }
  };

  const handleEdit = (post) => {
    console.log('Editing profile...');
    router.push(`/update-prompt?id=${post._id}`)
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
