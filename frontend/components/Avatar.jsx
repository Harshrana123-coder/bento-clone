import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { BiUpArrowCircle } from 'react-icons/bi';

const Avatar = ({ avatarUrl, userId }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // ✅ Upload Avatar
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const filePath = `avatars/${userId}-${Date.now()}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setLoading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // Save in DB
    const { error: dbError } = await supabase
      .from('profiles')
      .update({ avatar: publicUrl })
      .eq('id', userId);

    if (dbError) {
      console.error(dbError);
    }

    setLoading(false);
    window.location.reload(); // quick refresh (we can improve later)
  };

  // Open file picker
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-[7.5rem] h-[7.5rem] rounded-full bg-[#f7f7f7] flex items-center justify-center relative">

      {/* Avatar Image */}
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          width={200}
          height={200}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className="flex flex-col items-center">
          <BiUpArrowCircle className="text-[3rem] text-[#dedede]" />
          <p>Add Avatar</p>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleClick}
        className="absolute bottom-0 left-0 bg-white p-2 rounded-full shadow"
      >
        ⬆️
      </button>

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default Avatar;