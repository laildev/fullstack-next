"use client"

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LoginPage = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState('/');
  const [error, seterror] = useState("");

  useEffect(() => {
    // ✅ Hindari error saat build
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const url = params.get('callbackUrl') ?? '/';
      setCallbackUrl(url);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    seterror("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl
      })
      if (!result?.error) {
        setLoading(false);
        push(callbackUrl)
      } else {
        setLoading(false);
        if(result.status === 401) {
          seterror("Email or password is incorrect")
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign in</h1>
            <form className="mt-12 space-y-6" onSubmit={(e) => handleLogin(e)}>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input name="email" type="email" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter email" />
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input name="password" type="password" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter password" />
                </div>
              </div>
              {error !== '' && (
                <div className="text-red-600 font-bold-mb-5">{error}</div>
              )}

              <div className="!mt-12">
                <button type="submit" className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white ${loading ? 'bg-gray-300' : 'bg-blue-600'} hover:bg-blue-700 focus:outline-none cursor-pointer`}>
                  {loading ? 'loading...' : 'Sign in'}
                </button>
              </div>
              <hr />
              <button type="button" onClick={() => signIn('google', {callbackUrl, redirect: false})}   className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white ${loading ? 'bg-gray-300' : 'bg-blue-600'} hover:bg-blue-700 focus:outline-none cursor-pointer`}>Login With Google</button>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default LoginPage