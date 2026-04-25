import Link from 'next/link'
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { supabase } from '@/lib/supabase'

const LoginForm = () => {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  /* ✅ EMAIL + PASSWORD LOGIN */
  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Please fill all the fields')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Logged in successfully')
    router.replace('/user') // redirect after login
  }

  /* ✅ GOOGLE LOGIN */
  const handleGoogleLogin = async (e) => {
    e.preventDefault()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col h-fit max-w-[448px] w-full">
      <Toaster />

      <h1 className="font-bold text-[32px] leading-[40px] mt-2">
        Log in to your Bento
      </h1>

      <p className="mt-4 text-[20px] text-[#6c6c6c]">
        Good to have you back!
      </p>

      <form className="w-full mt-12">
        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full p-4 bg-[#f7f7f7] rounded-lg mb-4 focus:outline-none"
        />

        {/* Password */}
        <div className="flex bg-[#f7f7f7] rounded-lg items-center mb-3">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-4 bg-[#f7f7f7] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-4 text-sm font-bold">
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <Link
          href="/reset-password"
          className="text-sm underline text-[#768CFF]">
          Reset Password
        </Link>

        <div className="my-6 text-sm font-bold">OR</div>

        {/* Buttons */}
        {email ? (
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-black text-white font-bold hover:bg-black/80">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        ) : (
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 rounded-xl bg-[#1D9BF0] text-white font-bold flex items-center justify-center">
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        )}
      </form>

      <Link href="/signup" className="text-[#6c6c6c] mt-8 text-sm">
        or sign up
      </Link>
    </div>
  )
}

export default LoginForm
