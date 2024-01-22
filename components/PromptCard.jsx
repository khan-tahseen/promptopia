import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div>
          <Image
            src={post.creator.image}
            alt="user_image"
            height={40}
            width={40}
            className="rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
