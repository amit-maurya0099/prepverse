import React from 'react'

const Rootlayout = ({children}) => {
  return (
    <div className='root-layout  top-0 '>
    <nav className='flex justify-between items-center h-10' >
      <img src="/logo.png" alt="logo" className='h-full w-fit object-cover'></img>
      <img src="/profile.svg " alt="profile" className='object-cover h-full rounded-full'></img>
    
    </nav>
    {children}
    </div>
  )
}

export default Rootlayout
