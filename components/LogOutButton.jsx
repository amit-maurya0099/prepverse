'use client'
import React from 'react'
import { Button } from './ui/button'
import { signOut } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'


const LogOutButton = () => {
     const handleLogout=async()=>{
           await signOut();
           redirect('/sign-in')
     } 

  return (
    <Button className={'cursor-pointer'} onClick={handleLogout}>Logout</Button>
  )
}

export default LogOutButton
