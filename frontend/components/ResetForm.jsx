import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import toast, { Toaster } from 'react-hot-toast';

const ResetForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Enter your email');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Reset link sent to your email 📩');
  };

  return (
    <div className="flex flex-col max-w-[448px]">
      <Toaster />

      <h1 className="font-bold text-[32px]">Reset Password</h1>

      <p className="mt-4 text-[20px] text-[#6c6c6c]">
        Enter your email to receive a reset link
      </p>

      <form onSubmit={handleReset} className="mt-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full p-4 bg-[#f7f7f7] rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full h-12 bg-black text-white rounded-xl"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ResetForm;