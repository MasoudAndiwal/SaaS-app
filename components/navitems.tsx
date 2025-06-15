'use client'

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Navitem = [{label:'Home', href:'/'}, {label:'Companions', href:'/companions'}, {label:'My Journey', href:'/my-journey'}] ;

const Navitems = () => {
    const pathname = usePathname();
  return (
    <nav className='flex items-center gap-4'>
    {Navitem.map((item) => (
        <Link key={item.label} href={item.href} className={cn(pathname === item.href && 'text-primary font-semibold')}>
            {item.label}
        </Link>
    ))}
    </nav>
  )
}

export default Navitems