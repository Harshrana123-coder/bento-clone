import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function SignUpMail({
  email,
  setEmail,
  password,
  setPassword,
  name,
  showPassword,
  setShowPassword,
  prevPanel,
  handelSignUp,
}) {

  // ✅ Supabase Google Login
  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />

      <HiArrowNarrowLeft
        onClick={prevPanel}
        className="text-[28px] cursor-pointer text-[#6c6c6c]"
      />

      <p className="mt-4 text-[16px] text-[#6c6c6c]">
        <span>bento.me/</span>
        <span>{name}</span>
        <span> is yours!</span>
      </p>

      <h1 className="font-bold text-[32px] mt-2">
        Now, Create your account
      </h1>

      <div className="mt-10 space-y-3">

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full p-4 bg-[#f7f7f7] rounded-lg"
        />

        {/* Password */}
        <div className="flex bg-[#f7f7f7] rounded-lg items-center">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full p-4 bg-[#f7f7f7] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-4 text-sm font-bold"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="text-sm font-bold">OR</div>

        {/* Buttons */}
        {email ? (
          <button
            onClick={handelSignUp}
            className="w-full h-12 bg-black text-white rounded-xl"
          >
            Create account
          </button>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="w-full h-12 bg-[#1D9BF0] text-white rounded-xl flex items-center justify-center"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        )}
      </div>
    </>
  );
}