import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import {ReactNode} from 'react'

const AuthLayout = async({children}) => {
    const isUserAuthenticated= await isAuthenticated();
    if(isAuthenticated) redirect("/");
  return (
    <div className='auth-layout'>
      {children}
    </div>
  )
}

export default AuthLayout
