import React, { useState } from 'react';
import Image from 'next/image';
import DeleteIcon from '@/assets/delete.svg';
import { supabase } from '@/lib/supabase';

const TitleBox = ({ item }) => {
  const [title, setTitle] = useState(item?.content || '');
  const [editing, setEditing] = useState(false);

  // ✅ Update title
  const handleSave = async () => {
    if (!item) return;

    const { error } = await supabase
      .from('links')
      .update({ content: title })
      .eq('id', item.id);

    if (error) {
      console.error(error);
    }

    setEditing(false);
  };

  // ✅ Delete
  const handleDelete = async () => {
    if (!item) return;

    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', item.id);

    if (error) {
      console.error(error);
    } else {
      window.location.reload(); // simple refresh
    }
  };

  return (
    <div className="w-[375px] xl:w-[820px] bg-white rounded-xl p-3 shadow relative group">

      {/* Title */}
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          autoFocus
          placeholder="Add Title..."
          className="w-full text-xl font-bold outline-none bg-[#f5f5f5] p-2 rounded"
        />
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="text-xl font-bold cursor-text p-2 rounded hover:bg-[#f5f5f5]"
        >
          {title || 'Add Title...'}
        </div>
      )}

      {/* Delete Button */}
      <div
        onClick={handleDelete}
        className="absolute hidden group-hover:flex items-center justify-center -top-3 -left-3 w-8 h-8 bg-white rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Image src={DeleteIcon} alt="delete" />
      </div>

    </div>
  );
};

export default TitleBox;