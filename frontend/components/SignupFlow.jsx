import React, { useState } from 'react';
import SignUpMail from '@/components/SignUpMail';
import SignupLink from '@/components/SignupLink';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

const SignupFlow = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextPanel = (e) => {
    e.preventDefault();
    if (index < 1) {
      setIndex(index + 1);
      setDirection(1);
    }
  };

  const prevPanel = () => {
    if (index > 0) {
      setIndex(index - 1);
      setDirection(-1);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error('Please fill all the fields');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const user = data?.user;

    // ⚠️ If email confirmation ON
    if (!user) {
      toast.success('Check your email to verify your account 📩');
      router.push('/login');
      return;
    }

    // ✅ safer
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        username: name,
        email: email,
      });

    if (profileError) {
      toast.error(profileError.message);
      return;
    }

    toast.success('Signup successful 🎉');
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-fit max-w-[448px]">
      <Toaster />

      <AnimatePresence initial={false} custom={index} mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 * direction }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {index === 0 && (
            <SignupLink
              nextPanel={nextPanel}
              name={name}
              setName={setName}
            />
          )}

          {index === 1 && (
            <SignUpMail
              email={email}
              name={name}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              prevPanel={prevPanel}
              handelSignUp={handleSignUp}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignupFlow;