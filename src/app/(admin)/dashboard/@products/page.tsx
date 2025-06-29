"use client"

import { useState } from "react"


export default function AdminProductPage() {
  const [status, setStatus] = useState("");
  const revalidate = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_API}/api/revalidate?tag=products&secret=password123`, {
      method: "POST"
    })

    if (!result.ok) {
      setStatus("Revalidate Failed")
    } else {
      const response = await result.json();
      if (response.revalidate) {
        setStatus("Revalidate Successful")
      }
    }
  }

  return (
    <div className="w-3/6 h-96 bg-gray-300 rounded-[12px] flex justify-center items-center mr-5">
      <h1>{status}</h1>
      <button className="bg-black text-white p-3 m-5 cursor-pointer" onClick={revalidate}>Revalidate</button>
    </div>
  )
}