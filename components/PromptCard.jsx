import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt);

    setTimeout(() => {
      setCopied('');
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-start gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-700">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={15}
            height={15}
          />
        </div>
      </div>
      <p className="font-satoshi my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
