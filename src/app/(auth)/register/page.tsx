import Link from 'next/link'
import React from 'react'

const RegisterPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">

          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">Sign up</h1>
            <form className="mt-12 space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">User name</label>
                <div className="relative flex items-center">
                  <input name="username" type="text" required className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" placeholder="Enter user name" />
                </div>
              </div>
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

              <div className="!mt-12">
                <button type="button" className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer">
                  Sign up
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">Have registered <Link href="/login" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">sign in here</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegisterPage