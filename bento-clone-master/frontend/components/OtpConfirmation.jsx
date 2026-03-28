import { useState, useEffect } from 'react';
import React from 'react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

const OtpConfirmation = ({ otp, setOtp, nextPanel, email }) => {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsValid(otp.length === 6 && /^\d+$/.test(otp));
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('OTP verified ✅');
    nextPanel();
  };

  return (
    <>
      <h1 className="font-bold text-[32px]">Enter OTP</h1>

      <p className="mt-4 text-[20px] text-[#6c6c6c]">
        Enter the 6-digit code sent to your email
      </p>

      <form onSubmit={handleSubmit}>
        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength="6"
          className="w-full p-4 mt-6 bg-[#f7f7f7] rounded-xl"
        />

        <button
          type="submit"
          disabled={!isValid || loading}
          className="mt-4 w-full h-12 bg-black text-white rounded-xl"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </>
  );
};

export default OtpConfirmation;