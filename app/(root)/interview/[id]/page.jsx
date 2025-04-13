
import Agent from '@/components/Agent';
import DisplayTechIcons from '@/components/DisplayTechIcons';
import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/genral.action';
import { getRandomInterviewCover } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import React from 'react'

const page = async ({ params }) => {
    const { id } = await params;
    const Interview = await getInterviewById(id);
    const user = await getCurrentUser();
    if (!Interview) redirect('/');

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id,
    });


    return (
        <>
            <div className='flex flex-row gap-4 justify-between'>
                <div className='flex flex-row gap-4 items-center max-sm:flex-col' >
                    <div className='flex flex-row gap-4 items-center' >
                        <Image src={getRandomInterviewCover()} alt="image" width={40} height={40} className="rounded-full object-cover size-[40px]" />
                        <h3 className='capitalize'>{Interview?.role}</h3>



                    </div>
                    <DisplayTechIcons techStack={Interview?.techstack} />

                </div>



                <p className='bg-dark-200 px-4 py-2 rounded-lg h-fit capitalize'>{Interview?.type}</p>


            </div>
            <Agent
                userName={user?.name || ''}
                userId={user?.id}
                interviewId={id}
                type='interview'
                questions={Interview?.questions}
                feedbackId={feedback?.id}
            />
        </>
    )
}

export default page
