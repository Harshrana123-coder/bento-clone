import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabase'

export default function AuthListener() {
  const router = useRouter()
  const hasRun = useRef(false)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session && !hasRun.current) {
          hasRun.current = true

          const user = session.user

          const username =
            user.user_metadata?.username ||
            user.email.split('@')[0] + '_' + user.id.slice(0, 6)

          const { error } = await supabase.from('profiles').upsert(
            {
              id: user.id,
              display_name: username, // ✅ FIXED
              email: user.email,
            },
            {
              onConflict: 'id',
            }
          )

          if (error) {
            console.error('Profile upsert error:', error.message)
          }

          router.replace('/user')
        }
      }
    )

    return () => data.subscription.unsubscribe()
  }, [router])

  return null
}