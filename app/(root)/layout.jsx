
import LogOutButton from '@/components/LogOutButton';
import { Button } from '@/components/ui/button';
import { isAuthenticated, signOut } from '@/lib/actions/auth.action'
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';

import React from 'react'

const Rootlayout =async ({children}) => {

  const isUserAuthenticated= await isAuthenticated();
  if(!isUserAuthenticated) redirect('/sign-in')
  
  return (
    <div className='root-layout  top-0 '>
    <nav className='flex justify-between items-center h-10' >
      <img src="/logo.png" alt="logo" className='h-full w-fit object-cover'></img>
      <LogOutButton/>
    
    </nav>
    {children}
    </div>
  )
}

export default Rootlayout;
