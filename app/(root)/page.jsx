import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/genral.action'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async() => {

  const user=await getCurrentUser();
  const [userInterviews,latestInterviews]= await Promise.all([
    await getInterviewsByUserId(user?.id),
    await getLatestInterviews({userId:user?.id})
  ])
  
  
  const prevInterviews= userInterviews?.length > 0;
  const hasUpcomingInterviews= latestInterviews?.length > 0;
 

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-5 max-w-lg'>
           <h2>Get Interview Ready AI-Powered Practice & Feedback</h2>
           <p className='text-lg'>
            Practice on real interview questions and get instand feedback
           </p>
           <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview" prefetch={true}>Start an Interview</Link>
            </Button>
            
        </div>
      <Image src="/robot.png" alt="robo" height={400} width={400} className='max-sm:hidden'></Image>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {prevInterviews ? userInterviews.map((interview)=> <InterviewCard data={interview} key={interview.id}/>):
             <div className='flex justify-center text-lg w-full' >
             <p> Yoy have'nt taken any interview yet</p>
           </div>
          }

        </div>

      </section>
      <section className='flex flex-col gap-6 mt-8' >
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
        {hasUpcomingInterviews ? latestInterviews.map((interview)=> <InterviewCard data={interview} key={interview.id}/>):
             <div className='flex justify-center text-lg w-full' >
               <p>---- There are no new interviews available   -----</p>
             </div>
          }
        </div>
        
      </section>
    </>
  )
}

export default Page
