import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

export default function useRedirectIfAuth() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (user) {
        router.replace('/user'); // later → /[username]
      } else {
        setChecking(false);
      }
    };

    checkUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  return checking;
}
