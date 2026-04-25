import React, { useState, useRef } from 'react';
import Image from 'next/image';
import TextLogo from '@/assets/text.png';
import { supabase } from '@/lib/supabase';

const TextBox = ({ item, userId }) => {
  const [text, setText] = useState(item?.content || '');
  const textareaRef = useRef(null);

  // ✅ Save text to Supabase
  const handleSave = async (value) => {
    if (!item) return;

    const { error } = await supabase
      .from('links')
      .update({ content: value })
      .eq('id', item.id);

    if (error) {
      console.error('Update error:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    handleSave(value);
  };

  // ✅ Add new text card
  const handleAddText = async () => {
    const { data, error } = await supabase
      .from('links')
      .insert([
        {
          user_id: userId,
          title: 'text',
          content: '',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    // reload to show new card (we’ll improve later)
    window.location.reload();
  };

  // 🟡 Empty state
  if (!item) {
    return (
      <div
        onClick={handleAddText}
        className="h-[175px] w-[175px] bg-[#f7f7f7] border-2 border-dashed rounded-[1.5rem] flex items-center justify-center cursor-pointer"
      >
        <div className="flex flex-col items-center">
          <Image src={TextLogo} alt="text" width={32} height={32} />
          <p className="mt-2 font-bold text-sm">Add Text</p>
        </div>
      </div>
    );
  }

  // 🟢 Text card
  return (
    <div className="w-[250px] h-[150px] bg-white rounded-xl shadow p-3">

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        placeholder="Write something..."
        className="w-full h-full resize-none outline-none text-sm"
      />

    </div>
  );
};

export default TextBox;