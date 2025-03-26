import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async({techStack}) => {
    const  techIcons=await getTechLogos(techStack)
  return (
    <div className='flex  '>
       {techIcons.slice(0,3).map(({tech,url},index)=>{
        return(
            <div key={tech} className={cn("relative group rounded-full bg-dark-300 p-2 flex-center", index >=1 && "-ml-3")}>
               {/* <span>{tech}</span> */}
               <Image src={url} alt="tech-icon" width={20} height={20}/>

            </div>
        )
       })}
    </div>
  )
}

export default DisplayTechIcons
