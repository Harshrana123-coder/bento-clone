import React, { useState } from 'react';
import Image from 'next/image';
import crosslogo from '@/assets/whitecloselogo.svg';
import { supabase } from '@/lib/supabase';

const AddSocialLinkCard = ({
  platform,
  bgColor,
  logo,
  userId,
}) => {
  const [linkValue, setLinkValue] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const handleChange = (e) => {
    setLinkValue(e.target.value);
  };

  // ✅ ADD LINK (Supabase)
  const addLink = async () => {
    if (!linkValue) return;

    const { error } = await supabase.from('links').insert([
      {
        user_id: userId,
        title: platform,
        url: `https://${platform}.com/${linkValue}`,
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      setIsAdded(true);
      setLinkValue('');
    }
  };

  // ✅ REMOVE LINK (Supabase)
  const removeLink = async () => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('user_id', userId)
      .eq('title', platform);

    if (error) {
      console.error(error);
    } else {
      setIsAdded(false);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-3">

      {/* Logo */}
      {logo && (
        <Image
          src={logo}
          width={44}
          height={44}
          className="w-[2.75rem] h-[2.75rem] rounded-lg"
          alt="logo"
        />
      )}

      {/* Input Box */}
      <div
        style={{ backgroundColor: isAdded ? bgColor : '' }}
        className={`flex h-[44px] w-[280px] items-center gap-1 ${
          isAdded ? 'border-transparent text-white' : 'border text-black'
        } rounded-lg pl-3`}
      >
        <span>@</span>

        <input
          type="text"
          readOnly={isAdded}
          value={isAdded ? `@${platform}` : linkValue}
          onChange={handleChange}
          className="flex-1 bg-transparent outline-none"
        />

        {/* Actions */}
        <div className="mr-2">

          {isAdded ? (
            <button onClick={removeLink}>
              <Image src={crosslogo} width={14} height={14} alt="remove" />
            </button>
          ) : linkValue.length > 0 ? (
            <button
              onClick={addLink}
              className="bg-green-500 text-white px-2 py-1 rounded-lg"
            >
              Add
            </button>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default AddSocialLinkCard;