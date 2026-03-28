import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabase';

const useAuthGuard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return loading;
};

export default useAuthGuard;
