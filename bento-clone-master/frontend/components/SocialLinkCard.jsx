import React, { useState } from 'react';
import ResizingContainer from './ResizingContainer';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '@/store/profile-slice';
import { axiosWithToken } from '@/utils/axiosjwt';

const SocialLinkCard = ({ item, USERNAME }) => {
  // 🛑 1️⃣ HARD GUARD — prevents crash
  if (!item) return null;

  const dispatch = useDispatch();
  const { isSameUser } = useSelector((state) => state.ui);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ 2️⃣ SAFE STATE INITIALIZATION
  const [width, setWidth] = useState(item.width ?? 320);
  const [height, setHeight] = useState(item.height ?? 120);

  // ✅ 3️⃣ Resize handler (unchanged logic)
  const handleResize = async (newWidth, newHeight) => {
    try {
      await axiosWithToken.put(
        `${API_URL}/profile/resize/${USERNAME}/${item.id}/${newWidth}/${newHeight}`
      );
    } catch (error) {
      console.log('Resize error:', error.message);
    }

    setWidth(newWidth);
    setHeight(newHeight);
  };

  // ✅ 4️⃣ Safe link creation
  const link = item.baseUrl?.includes('linkedin')
    ? `https://${item.baseUrl}.com/in/${item.userName}`
    : `https://${item.baseUrl}.com/${item.userName}`;

  // ✅ 5️⃣ Editable username (unchanged logic)
  const updateUserName = async (e) => {
    if (!isSameUser) return;

    const newUserName = e.target.innerText;

    dispatch(
      profileActions.updateItem({ ...item, userName: newUserName })
    );

    try {
      await axiosWithToken.put(`${API_URL}/profile/${USERNAME}`, {
        ...item,
        userName: newUserName,
      });
    } catch (err) {
      console.log('Username update error:', err.message);
    }
  };

  return (
    <ResizingContainer
      USERNAME={USERNAME}
      width={width}
      height={height}
      item={item}
      handleResize={handleResize}
    >
      <div className="w-full h-full p-4 relative">
        {/* Logo */}
        <div className="px-2 pt-2">
          <div className="h-12 w-12">
            <Image
              src={item.logo}
              width={44}
              height={44}
              alt="logo"
            />
          </div>
        </div>

        {/* Username */}
        {isSameUser ? (
          <div
            onBlur={updateUserName}
            contentEditable
            suppressContentEditableWarning
            className="mt-1 font-bold p-2 w-full rounded-lg text-sm hover:bg-[#f5f5f5] cursor-text"
          >
            {item.userName}
          </div>
        ) : (
          <div className="mt-1 font-bold p-2 w-full rounded-lg text-sm">
            {item.userName}
          </div>
        )}

        {/* Follow Button */}
        <Link href={link} target="_blank">
          <button
            className="absolute bottom-5 left-5 text-white text-xs font-bold py-2 px-5 rounded-md"
            style={{ backgroundColor: item.bgColor }}
          >
            Follow
          </button>
        </Link>
      </div>
    </ResizingContainer>
  );
};

export default SocialLinkCard;
