'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbaritems from './navitems'
import MobileNavbar from './MobileNavbar'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
const Navbar = () => {
  return (
    <div className='navbar' >
        <Link href='/'>
            <div className='flex items-center gap-2.5 cursor-pointer'>
                <Image src='/images/logo.svg' alt='logo' width={46} height={44} />
                
            </div>
        </Link>
        {/* Mobile dropdown button */}
        <div className=' max-sm:flex  md:hidden gap-6'>
        <MobileNavbar />
        <SignedOut>
            <SignInButton>
              <button className='btn-signin'>Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
        </div>
        <div className='hidden md:flex items-center  cursor-pointer gap-3 '>
          <Navbaritems />
          <SignedOut>
            <SignInButton>
              <button className='btn-signin'>Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
              <UserButton />
          </SignedIn>
        </div>
    </div>
  )
}

export default Navbar