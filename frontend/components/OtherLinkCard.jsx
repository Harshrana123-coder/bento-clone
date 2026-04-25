import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LinkLogo from '@/assets/link.svg';

const OtherLinkCard = ({ link }) => {
  if (!link) return null;

  return (
    <Link href={link.url} target="_blank">
      <div className="w-[200px] h-[120px] bg-white rounded-xl shadow p-4 cursor-pointer hover:scale-105 transition">

        {/* Logo */}
        <div className="h-10 w-10 p-2 rounded-md flex items-center justify-center border shadow-sm">
          <Image
            src={LinkLogo}
            width={24}
            height={24}
            alt="logo"
          />
        </div>

        {/* Title */}
        <div className="mt-2 font-bold text-sm line-clamp-2">
          {link.title || 'Link'}
        </div>

        {/* URL */}
        <p className="text-xs text-gray-500 truncate">
          {link.url}
        </p>

      </div>
    </Link>
  );
};

export default OtherLinkCard;