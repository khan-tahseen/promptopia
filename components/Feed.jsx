'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (text) => {
    const regex = new RegExp(text, 'i'); // 'i' flag for case-insensitive matching
    return posts.filter(
      (post) =>
        regex.test(post.prompt) ||
        regex.test(post.creator.username) ||
        regex.test(post.tags)
    );
  };

  if (!posts) {
    return <div>Loading...</div>;
  }

  const handleSearchText = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce meathod
    setSearchTimeout(
      setTimeout(() => {
        const filteredPosts = filterPrompts(e.target.value);
        setSearchResults(filteredPosts);
      }, 500)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const filteredPosts = filterPrompts(tag);
    setSearchResults(filteredPosts);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />

        {searchText && (
          <Image
            src={'/assets/icons/cross.svg'}
            width={22}
            height={22}
            className="absolute right-4 cursor-pointer"
            onClick={() => setSearchText('')}
          />
        )}
      </form>

      {searchText ? (
        <PromptCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
