'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { saveCompanion, deleteSavedCompanion, isCompanionSaved } from '@/lib/actions/companion.action';
interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}
const CompanionCard = ({ id, name, topic, subject, duration, color }: CompanionCardProps) => {
  const [isSaved, setIsSaved] = useState(false);

  // fetch saved companions once
  const { userId } = useAuth();

  // initial fetch
  useEffect(() => {
    (async () => {
      try {
        const saved = await isCompanionSaved(id);
        setIsSaved(saved);
      } catch (error) {
        console.error('Failed to determine saved status', error);
      }
    })();
  }, [id]);

  // realtime subscription
  useEffect(() => {
    if (!userId) return;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const channel = supabase
      .channel(`saved-companion-${id}-${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'save_Companion',
        filter: `companionid=eq.${id}`
      }, payload => {
        if (payload.eventType === 'INSERT' && payload.new.userid === userId) {
          setIsSaved(true);
        }
        if (payload.eventType === 'DELETE' && payload.old.userid === userId) {
          setIsSaved(false);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, userId]);

  const handleBookmark = async () => {
    if (!userId) return;
    try {
      if (isSaved) {
        await deleteSavedCompanion(id);
        setIsSaved(false);
      } else {
        await saveCompanion(id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  };
 
  return (
    <article  className='companion-card' style={{backgroundColor: color}}>
        <div className='flex justify-between items-center'>
          <div className='subject-badge'>{subject}</div>
          <Button className='companion-bookmark p-0' onClick={handleBookmark}>
            <Image src={isSaved ? '/icons/bookmark-filled.svg' : '/icons/bookmark.svg'} alt='bookmark' width={24} height={24} className='w-5 h-5' />
          </Button>
        </div>
        <h2 className='text-2xl'>{name}</h2>
        <p>{topic.slice(0, 50)}...</p>
        <div className='flex items-center gap-2'>
          <Image src='/icons/clock.svg' alt='duration' width={14.5} height={14.5} />
          <p className='texsm'>{duration} minutes</p>
        </div>
        <Link href={`/companions/${id}`} className='w-full'>
          <button className='btn-primary w-full justify-center'>
            Launch Lesson
          </button>
        </Link>
    </article>
  )
}

export default CompanionCard