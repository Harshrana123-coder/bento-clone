import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

const ResetPassword = ({ email, setEmail }) => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail) return;

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
    <>
      <h1 className="font-bold text-[32px]">
        Reset your password
      </h1>

      <p className="mt-4 text-[20px] text-[#6c6c6c]">
        Enter your email and we’ll send you a reset link
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="email"
            className="w-full p-4 rounded-xl bg-[#f7f7f7]"
          />
        </div>

        <button
          type="submit"
          disabled={!isValidEmail || loading}
          className="mt-4 w-full h-12 bg-black text-white rounded-xl"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </>
  );
};

export default ResetPassword;