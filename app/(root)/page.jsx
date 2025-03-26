import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {

  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-5 max-w-lg'>
           <h2>Get Interview Ready AI-Powered Practice & Feedback</h2>
           <p className='text-lg'>
            Practice on real interview questions and get instand feedback
           </p>
           <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
            </Button>
            
        </div>
      <Image src="/robot.png" alt="robo" height={400} width={400} className='max-sm:hidden'></Image>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.map((interview)=> <InterviewCard data={interview} key={interview.id}/>)}

        </div>

      </section>
      <section className='flex flex-col gap-6 mt-8' >
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
        {dummyInterviews.map((interview)=> <InterviewCard data={interview} key={interview.id}/>)}
        {/* <p>You have'nt any ineterview yet.</p> */}
        </div>
        
      </section>
    </>
  )
}

export default Page
