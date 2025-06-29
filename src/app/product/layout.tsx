// app/product/layout.tsx
import React from 'react'

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div>
      {children}
      {modal} {/* modal ini adalah content dari @modal */}
    </div>
  );
}
