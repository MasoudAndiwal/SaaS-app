// @ts-ignore
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from '../lib/utils'
import Vapi from '@vapi-ai/web';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json'
import { Content } from 'next/font/google';
enum CallStatus {
    INACTIVE = "inactive",
    ACTIVE = "active",
    CONNECTING = "connecting",
    FINISHED = "finished"
}
const CompanionComponent = ({companionId, subject, topic, name, userName, userImage, style, voice}: CompanionComponentProps) => {
    const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setisMuted] = useState(false)
    const [message , setMessage] = useState<SavedMessage[]>([])
    useEffect(() => {
        const onCallStar = () => setcallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => setcallStatus(CallStatus.FINISHED)
        const onMessage = (message : Message) => {
             if(message.type === 'transcript' && message.transcriptType === 'final'){
                const newMessage = {role : message.role , content: message.transcript}
                setMessage((prev) => [newMessage, ...prev  ])    
             }
        }
        const onError = (error : Error ) => console.log(error)
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        vapi.on('call-start' , onCallStar)
        vapi.on('call-end' , onCallEnd)
        vapi.on('message' , onMessage)
        vapi.on('error' , onError)
        vapi.on('speech-start' , onSpeechStart)
        vapi.on('speech-end' , onSpeechEnd)
        return () => {
            vapi.off('call-start' , onCallStar)
            vapi.off('call-end' , onCallEnd)
            vapi.off('message' , onMessage)
            vapi.off('error' , onError)
            vapi.off('speech-start' , onSpeechStart)
            vapi.off('speech-end' , onSpeechEnd)
        }
    }, [])
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) lottieRef.current?.play() 
                 else lottieRef.current?.stop()
        }
    }, [isSpeaking , lottieRef]);
    const toggleMicrophone  = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setisMuted(!isMuted)
    }
    const handelDisconnect = ( ) => {
        setcallStatus(CallStatus.CONNECTING);
        const assistantOverrides = {
            subject , topic , style ,
            clientMessages :['transcript'],
            serverMessge: [],
        }
        // @ts-expect-error
        vapi.start(configureAssistant(voice , style ), assistantOverrides)

    }
    const handCall = () => {
        setcallStatus(CallStatus.FINISHED)
        vapi.stop()
    }
  return (
    <section className='flex flex-col h-[70px] '>
        <section className='flex gap-8 max-sm:flex-col max-sm:items-center'>
            <div className='companion-section'>
                <div className='companion-avatar' style={{backgroundColor: getSubjectColor(subject)}}>
                    <div className={cn('absolute transition-opacity duration-1000' , callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-1001' : 'opacity-0' , callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse') }>
                        <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className='max-sm:w-fit'/>
                    </div>
                    <div className={cn('absolute transition-opacity duration-1000' , callStatus === CallStatus.ACTIVE || callStatus === CallStatus.CONNECTING ? 'opacity-100' : 'opacity-0' , callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0') }>
                        <Lottie 
                        lottieRef={lottieRef}
                        animationData={soundwaves}
                        autoplay={false}
                        className='companion-lottie'
                        />
                    </div>
                </div>
                <p className='font-bold text-2xl'>{name}</p>
            </div>
            <div className='user-section'>
                <div className='user-avatar'>
                    <Image src={userImage} alt={userName} width={130} height={130} className='rounded-lg'  />
                    <p className='font-bold text-2xl'>{userName}</p>
                </div>
                <button className='btn-mic' onClick={toggleMicrophone}>
                    <Image  src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='Min' width={36} height={36} />
                    <p className='max-sm:hidden'>{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
                </button>
                <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white' , callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary' , callStatus === CallStatus.CONNECTING && 'animate-pulse'  )} onClick={callStatus === CallStatus.ACTIVE ? handelDisconnect : handCall}>
                    {callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connectiong' : 'Start Session'}
                </button>
            </div>  
        </section>
        <section className='transcript'>
            <div className='transcript-message no-scrollbar'>
                <p className='font-bold text-2xl text-red-800'>
                    {message.map((message) => {
                        if(message.role === 'assistant'){
                            return (
                                <p key={message.content} className='max-sm:text-sm'>
                                    {name.split(' ')[0].
                                    replace('/[.,]/g' , '')}:{message.content}
                                </p>
                            )
                        }else{
                            <p key={message.content} className='text-primary max-sm:text-sm'>
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </p>
            </div>
            <div className='transcript-fade'/>
        </section>
    </section>
  )
}

export default CompanionComponent
