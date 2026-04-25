import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const SignupLink = ({ name, setName, nextPanel }) => {
  const [isAlreadyExist, setIsAlreadyExist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUsername = async () => {
      if (!name) return;

      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', name)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      setIsAlreadyExist(!!data);
      setLoading(false);
    };

    const delayDebounce = setTimeout(() => {
      checkUsername();
    }, 400); // debounce

    return () => clearTimeout(delayDebounce);
  }, [name]);

  return (
    <>
      <h1 className="font-bold text-[32px]">
        First, claim your unique link
      </h1>

      <p className="mt-4 text-[20px] text-[#6c6c6c]">
        The good ones are still available!
      </p>

      <form className="w-full">
        <div className="mt-10">
          <div className="flex items-center">
            <div className="pl-3 py-4 bg-[#f7f7f7] text-[#6c6c6c] rounded-l-xl">
              bento.me/
            </div>

            <input
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase())}
              placeholder="yourname"
              className="w-full p-4 bg-[#f7f7f7] rounded-r-xl outline-none"
            />
          </div>
        </div>

        <div className="mt-4 h-[58px]">
          {name && !isAlreadyExist && !loading && (
            <button
              onClick={nextPanel}
              className="w-full h-full bg-black text-white rounded-xl"
            >
              Grab my Link
            </button>
          )}

          {loading && (
            <p className="text-sm text-gray-500">Checking...</p>
          )}

          {isAlreadyExist && (
            <p className="text-red-500 text-sm mt-2">
              Username already taken 😕
            </p>
          )}
        </div>
      </form>

      <Link href="/login" className="text-[#6c6c6c] mt-6 block text-sm">
        or Log in
      </Link>
    </>
  );
};

export default SignupLink;