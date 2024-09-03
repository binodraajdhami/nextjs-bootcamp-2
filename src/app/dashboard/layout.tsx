import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function layout({ children}:{ children: ReactNode} ) {
  return (
    <>
    <div className='p-8 bg-slate-900 text-white flex gap-5 uppercase'>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/dashboard/products">Products</Link>
      <Link href="/dashboard/users">Users</Link>
      <Link href="/dashboard/posts">Posts</Link>
    </div>
    <main className='p-8'>
        {children}
    </main>
    </>
  )
}
