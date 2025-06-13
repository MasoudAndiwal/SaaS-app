import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'
interface CompanionComponentProps {
    params: Promise<{id: string}>;
}
async function page({ params } : CompanionComponentProps) {
    const { id } = await params;
    const { subject , name , title , topic , duration} = await getCompanion(id)
    const user = await currentUser();

    




    if(!user) redirect("/sign-in")
    if(!subject) redirect("/companions")
    return (
        <main>
            <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
                <div className='flex items-center gap-2'>
                    <div className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden' style={{backgroundColor: getSubjectColor(subject)}}>
                        <Image src={`/icons/${subject}.svg`} alt='subject' width={35} height={35} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center gap-2'>
                            <p className='text-2xl font-semibold'>{name}</p>
                            <div className='subject-badge max-sm:hidden'>
                            {subject}   
                            </div>
                        </div>
                       
                        <p className='text-lg'>{topic}</p>
                    </div>
                </div>
                <div className='item-center text-2xl max-md:hidden'>
                   <span> {duration} MIN</span>
                </div>
            </article>
            <CompanionComponent
            subject={subject}
            name={name}
            title={title}
            topic={topic}
            duration={duration}
            companionId={id}
            userName={user.firstName!}
            userImage={user.imageUrl!}
            />
        </main>
    )
}

export default page