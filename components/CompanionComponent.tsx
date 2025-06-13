'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn, getSubjectColor } from '../lib/utils'
import Vapi from '@vapi-ai/web';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json'
interface CompanionComponentProps {
    subject: string;
    name: string;
    title: string;
    topic: string;
    duration: string;
    companionId: string;
    userName: string;
    userImage: string;
}
enum CallStatus {
    INACTIVE = "inactive",
    ACTIVE = "active",
    CONNECTING = "connecting",
    FINISHED = "finished"
}
const CompanionComponent = ({subject , name , title , topic , duration , companionId , userName , userImage}: CompanionComponentProps) => {
    const [callStatus, setcallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    useEffect(() => {
        const onCallStar = () => setcallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => setcallStatus(CallStatus.FINISHED)
        const onMessage = () => {}
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
                </div>
            </div>  
        </section>
    </section>
  )
}

export default CompanionComponent
