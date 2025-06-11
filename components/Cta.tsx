import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

const CTA = () => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>Start learning you way.</div>
      <h2 className='text-3xl font-bold'>Build and Personalze Learnin companion </h2>
      <p>Pick a name, subject, voice, & personality - and start learning through voice conversations that feel natural and fun.</p>
      <Image src='images/cta.svg' alt='cta' width={500} height={500}   />
              <Button className='bg-[#FE5933] w-full h-10'>
                <Image src='/icons/plus.svg' alt='plus' width={12} height={12}   />
                <Link href='/companions/new'>
                <p>Build New Companion</p>
                </Link>
              </Button>
    </section>
  )
}

export default CTA