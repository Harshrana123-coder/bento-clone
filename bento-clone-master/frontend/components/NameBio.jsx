import React from 'react';

const NameBio = ({ username, bio, isLaptop }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      
      {/* Name */}
      <div
        className={`tracking-[-2px] text-[32px] ${
          isLaptop && 'xl:text-[44px]'
        } font-bold leading-[120%] text-[#565656]`}
      >
        {username || "Your Name"}
      </div>

      {/* Bio */}
      <div
        className={`mt-3 ${
          isLaptop && 'xl:text-xl'
        } text-[#565656]`}
      >
        {bio || "Your Bio"}
      </div>

    </div>
  );
};

export default NameBio;