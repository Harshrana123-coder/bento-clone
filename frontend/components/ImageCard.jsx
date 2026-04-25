import React, { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import imageLogo from '@/assets/image.png';

const ImageCard = ({ imageUrl, userId }) => {
  const [img, setImg] = useState(imageUrl);

  // ✅ Upload Image
  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const filePath = `images/${userId}-${Date.now()}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      return;
    }

    // Get public URL
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    const publicUrl = data.publicUrl;

    // Save in DB (we’ll reuse links table for now)
    await supabase.from('links').insert([
      {
        user_id: userId,
        title: 'image',
        url: publicUrl,
      },
    ]);

    setImg(publicUrl);
  };

  return (
    <div className="w-[175px] h-[175px] rounded-[1.5rem] bg-[#f7f7f7] relative overflow-hidden">

      {img ? (
        <Image
          src={img}
          alt="uploaded"
          fill
          className="object-cover"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Image src={imageLogo} alt="Add image" width={24} height={24} />
          <p className="mt-1 font-bold text-[14px]">Add Image</p>
        </div>
      )}

      {/* Upload */}
      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ImageCard;