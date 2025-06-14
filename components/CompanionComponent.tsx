// @ts-nocheck
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'
import type {Message} from '@vapi-ai/web'
import type {SavedMessage} from '@/types'
import { addToSessionHistory } from '@/lib/actions/companion.action'
import { useRouter } from 'next/navigation'


// enum for check the button status
enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])
    // the start , stop vapi , message , or .... etc useeffect
    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(companionId)
        }
        const onError = (error: Error) => console.log(error)
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        // message handler 
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [newMessage, ...prev])
            }
        }
        // vapi start 
        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)
        // return the vapi stop 
        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
        }
    }, [])
    // check the lottieref if ai speack run or not 
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) lottieRef.current?.play()
            else lottieRef.current?.stop()
        }
    }, [isSpeaking, lottieRef]);
    // toggle microphone to mute and unmute 
    const toggleMicrophone = () => {
        const muted = vapi.isMuted()
        vapi.setMuted(!muted)
        setIsMuted(!muted)
    }
    // start button handler
    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)
        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ['transcript'],
            serverMessages: [],
        }
        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }
    const router = useRouter()

    // end button hudler
    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
        router.push('/');
    }
    // the UI 
    return (
        <section className='flex flex-col h-[90vh]'>
            <section className='flex gap-8 max-sm:flex-col max-sm:items-center'>
                <div className='companion-section'>
                    <div className='companion-avatar' style={{ backgroundColor: getSubjectColor(subject) }}>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse')}>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className='max-sm:w-fit' />
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
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
                        <Image src={userImage} alt={userName} width={130} height={130} className='rounded-lg' />
                        <p className='font-bold text-2xl'>{userName}</p>
                    </div>
                    <button className='btn-mic' onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='mic' width={36} height={36} />
                        <p className='max-sm:hidden'>{isMuted ? 'Turn on microphone' : 'Turn off microphone'}</p>
                    </button>
                    <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatus.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connecting' : 'Start Session'}
                    </button>
                </div>
            </section>
            <section className='transcript'>
                <div className='transcript-message no-scrollbar'>
                    {messages.map((msg, index) => {
                        if (msg.role === 'assistant') {
                            return (
                                <p key={index} className='max-sm:text-sm'>
                                    {name.split(' ')[0].replace(/[.,]/g, '')}: {msg.content}
                                </p>
                            )
                        }
                        return (
                            <p key={index} className='text-primary max-sm:text-sm'>
                                {userName}: {msg.content}
                            </p>
                        )
                    })}
                </div>
                <div className='transcript-fade' />
            </section>
        </section>
    )
}

export default CompanionComponent
