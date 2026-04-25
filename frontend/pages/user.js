import React, { useEffect, useState } from 'react';
import useAuthGuard from '@/hooks/useAuthGuard';
import { supabase } from '@/lib/supabase';

import Avatar from '@/components/Avatar';
import NameBio from '@/components/NameBio';
import SocialLinkCard from '@/components/SocialLinkCard';
import ImageCard from '@/components/ImageCard';
import OtherLinkCard from '@/components/OtherLinkCard';
import MapBox from '@/components/MapBox';
import LogoutButton from '@/components/LogoutButton';

const User = () => {
  const loading = useAuthGuard();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error(error);
      } else {
        console.log("PROFILE:", data);
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !profile) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#f7f7f7] p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">My Bento Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* ✅ FIXED FIELD NAMES */}
        <Avatar avatarUrl={profile.avatar} />

        <NameBio 
          username={profile.display_name} 
          bio={profile.bio} 
        />

        <SocialLinkCard />
        <ImageCard />
        <OtherLinkCard />
        <MapBox />

      </div>
    </div>
  );
};

export default User;