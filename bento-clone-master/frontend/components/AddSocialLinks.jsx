import React from 'react';
import AddSocialLinkCard from '@/components/AddSocialLinkCard';

const AddSocialLinks = ({ userId }) => {

  // ✅ Define platforms manually (simple & clean)
  const socialPlatforms = [
    { name: 'instagram' },
    { name: 'twitter' },
    { name: 'github' },
    { name: 'linkedin' },
  ];

  return (
    <div className="px-3 xl:p-0 max-w-[23.5rem] xs:w-[23.5rem] z-10">
      
      <h1 className="font-bold text-2xl mb-5 xl:mb-10">
        Now, let&apos;s add your social media accounts
      </h1>

      <div className="relative rounded-lg">
        <div className="w-full max-h-[calc(100vh-20.5rem)] pb-8 overflow-y-scroll">

          {socialPlatforms.map((platform, index) => (
            <AddSocialLinkCard
              key={index}
              platform={platform.name}
              userId={userId}
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export default AddSocialLinks;