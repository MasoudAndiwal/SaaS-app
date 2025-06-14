import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { redirect } from 'next/navigation'
import { newCompanionPermissions } from '@/lib/actions/companion.action'
import Image from 'next/image'
import Link from 'next/link'

const newCompanion = async () => {
  const { userId } = await auth()
  if(!userId){
    return redirect('/sign-in');
  }
  const hasPermission = await newCompanionPermissions();

  return (
    <main className='min-lg:w-1/2 min-md:w-2/3 items-center justify-center '>
      {hasPermission ? (
        <article className='w-full gap-4 flex flex-col  '>
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className='companion-limit w-full '>
          <Image src='/images/limit.svg' alt='Companion limit reached' width={360} height={230} />
          <div className='cta-badge'>
            Upgrade your plan
          </div>
          <h1>You have reached the limit </h1>
          <p>you have reached your companion limit. Upgrade to create more companions and premium features</p>
          <Link href='/subscription' className='btn-primary w-full justify-center'>Upgrade my plan</Link>
        </article>
      )}
    </main>
  )
}

export default newCompanion