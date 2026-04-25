import React from 'react';
import Image from 'next/image';
import DeleteIcon from '@/assets/delete.svg';
import { BiSearch } from 'react-icons/bi';
import { supabase } from '@/lib/supabase';

const ResizingContainer = ({
  children,
  width,
  height,
  handleResize,
  type,
  item,
  isSearchOpen,
  setIsSearchOpen,
  userId,
}) => {

  // ✅ DELETE using Supabase
  const handleDelete = async () => {
    if (!item) return;

    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', item.id);

    if (error) {
      console.error('Delete error:', error);
    } else {
      // simple refresh (we’ll optimize later)
      window.location.reload();
    }
  };

  return (
    <div className="relative flex-1 group">

      {/* Card */}
      <div
        className={`${
          width === 2 || width === 3 || width === 5
            ? 'xs:w-[377px] xl:w-[388px] w-[calc(100vw-2rem)]'
            : 'xs:w-[175px] w-[calc(100vw/2-2rem)]'
        } ${
          (height === 1 || height === 3) &&
          'h-[calc(100vw/2-2rem)] xs:h-[175px]'
        } ${
          (height === 4 || height === 5) &&
          'h-[calc(100vw-2rem)] xs:h-[377px] xl:h-[388px]'
        } ${
          height === 2 && 'h-[65px]'
        } bg-white rounded-[24px] border shadow-lg transition-all duration-300`}
      >
        {children}
      </div>

      {/* ✅ DELETE BUTTON */}
      <div
        onClick={handleDelete}
        className="absolute hidden group-hover:flex items-center justify-center -top-4 -left-4 w-9 h-9 rounded-full bg-white shadow-lg cursor-pointer hover:bg-gray-100"
      >
        <Image src={DeleteIcon} alt="delete" />
      </div>

      {/* ✅ RESIZE CONTROLS (LOCAL ONLY) */}
      <div className="absolute hidden group-hover:flex bottom-[-30px] left-[50%] -translate-x-1/2 bg-black rounded-[8px] p-2 gap-2 z-10">

        {[1, 2, 3, 4, 5].map((size) => (
          <div
            key={size}
            onClick={() => handleResize?.(size, size)}
            className={`w-7 h-7 ${
              width === size && height === size ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}
          >
            <div
              className={`border-2 ${
                width === size && height === size
                  ? 'border-black'
                  : 'border-white'
              } ${
                size === 1
                  ? 'w-3 h-3'
                  : size === 2
                  ? 'w-5 h-2'
                  : size === 3
                  ? 'w-5 h-3'
                  : size === 4
                  ? 'w-2 h-5'
                  : 'w-5 h-5'
              } rounded`}
            ></div>
          </div>
        ))}

        {/* Map search toggle */}
        {type === 'map' && (
          <div
            onClick={() => setIsSearchOpen?.(!isSearchOpen)}
            className={`w-7 h-7 ${
              isSearchOpen ? 'bg-white' : 'bg-black'
            } flex items-center justify-center rounded cursor-pointer`}
          >
            <BiSearch
              className={`w-5 h-5 ${
                isSearchOpen ? 'text-black' : 'text-white'
              }`}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ResizingContainer;