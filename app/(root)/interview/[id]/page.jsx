import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/genral.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import React from 'react'

const page =async ({params}) => {
    const {id}=await params;
   const Interview=await getInterviewById(id);
   const user=await getCurrentUser();
   
   if(!Interview) redirect('/');
  return (
    <>
        <div className='flex flex-row gap-4 justify-between'>
            <div className='flex flex-rouw gap-4 items-center max-sm:flex-col' >
                <div className='flex flex-row gap-4 items-center' >
               <Image  src={getRandomInterviewCover()} alt="image" width={40} height={40} className="rounded-full object-cover size-[40px]" />
               <h3 className='capitalize'>{Interview?.role}</h3>

                </div>
                <DisplayTechIcons techStack={Interview?.techstack}/>
            </div>
            <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{Interview?.type}</p>
        </div>
        <Agent 
        userName={user?.name}
        userId={user?.id}
        interviewId={id}
        type='interview'
        questions={Interview?.questions}
        />
    </>
  )
}

export default page
