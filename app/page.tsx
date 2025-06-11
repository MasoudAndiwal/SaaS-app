import React from 'react'
import { Button } from '@/components/ui/button'

const Page = () => {
  return (
    <div>
      <h1 className='text-2xl underline'> welcome  to my SAAS</h1>
      <Button className='bg-primary text-primary-foreground'>
        Let's get started
      </Button>
    </div>
  )
}

export default Page