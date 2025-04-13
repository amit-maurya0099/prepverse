'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { vapi } from '@/lib/vapi.sdk';
import { interviewer } from '@/constants';
import { createFeedback } from '@/lib/actions/genral.action';

const CallStatus = {
  INACTIVE: 'INACTIVE',
  CONNECTING: 'CONNECTING',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

const Agent = ({ userName, userId, type, interviewId, questions,feedbackId }) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [messages, setMessages] = useState([]);

  const lastMessage = messages[messages.length - 1];

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };

        setMessages((prevMsg) => [...prevMsg, newMessage])

      }

    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error) => console.log('Error', error);
    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    }

  }, []);

  const handleGenerateFeedback = async (messages) => {
    
    const {success,feedbackId:id} = await createFeedback({
      interviewId: interviewId,
      userId: userId,
      transcript: messages,
      feedbackId,
    });
 
    if (success && id) {
      router.push(`/interview/${interviewId}/feedback`)
    } else {
      console.log('Error saving feedback');
      router.push('/')
    }
  }
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      if (type === 'generate') {
        router.push("/");
      } else {
       
        handleGenerateFeedback(messages);
      }
    }

  }, [messages, callStatus,interviewId, type, userId])
  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === 'generate') {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else{
        let formattedQuestions='';
        if(formattedQuestions){
          formattedQuestions=questions.map((question)=> `- ${question}`).join('/n');
        }
        await vapi.start(interviewer,{
          variableValues:{
            questions:formattedQuestions
          }
        })
    }
  }
  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }
  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = (callStatus) => callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;


  return (
    <>

      <div className="call-view" >
        <div className='card-interviewer'>
          <div className='avatar'>
            <Image src="/ai-avatar.png" alt="vapi" width={65} height={54} className='object-cover' />
            {isSpeaking && <span className='animate-speak'></span>}
          </div>
          <h3>AI Interviewer</h3>
        </div>

        <div className='card-border'>
          <div className='card-content'>
            <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className='rounded-full object-cover size-[120px]' />
            <h3>{userName || "You"}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className='transcript-border'>
          <div className='transcript'>
            <p className={cn("transition-opacitty duration-500 opacity-0", 'animate-fadeIn opacity-100')} key={latestMessage}>{latestMessage} </p>

          </div>

        </div>
      )}
      <div className='w-full flex justify-center '>
        {callStatus !== 'ACTIVE' ? <button className='relative btn-call' onClick={handleCall}>
          <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== 'CONNECTING' && 'hidden')} />
          <span>{isCallInactiveOrFinished ? "Call" : "..."}</span>

        </button> : <button className='btn-disconnect' onClick={handleDisconnect}>
          End
        </button>}

      </div>
    </>
  )

}

export default Agent
