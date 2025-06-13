'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils'

function SearchInput() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';
    const [searchQuery, setsearchQuery] = useState(query)
    
    useEffect(() => {
        const dalayDebounceFn = setTimeout(()=>{
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery){
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });
                
                router.push(newUrl, {scroll: false});
            }else{
                if(pathname === '/companions'){
                     const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic']
                     })
                     router.push(newUrl, {scroll: false})
                }
            }
        }, )
        
        return () => clearTimeout(delayDebounceFn)
    } , 500)
    }, [searchQuery, router, searchParams, pathname])
    
    return (
        <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit w-[360px]'>
            <Image src='/icons/search.svg' alt='search' width={15} height={15} />
            <input 
                type="text" 
                placeholder='Search Companion ...' 
                value={searchQuery} 
                onChange={(e) => setsearchQuery(e.target.value)}
                className="outline-none w-full bg-transparent" 
            />
        </div>
    )
}

export default SearchInput