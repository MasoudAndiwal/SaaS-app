import { Button } from '@/components/ui/button'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/Cta'
import { recentSessions } from '@/constants'

const Page = () => {
  return (
    <div className='mt-14'>
     <h1 className='text-center'>Popular Companions</h1>

     <section className='home-section'>

      <CompanionCard 
      id='123'
      name='Neura the Brainy Explorer'
      topic = 'Neural Network of the Brain'
      subject = 'science'
      duration={45}
      color="#E5D0FF"
      />
      <CompanionCard 
      id='1234'
      name='Countsy the Number Wizard '
      topic = 'Derivatives & integrals'
      subject = 'math'
      duration={35}
      color="#BDE7FF"
      />
      <CompanionCard 
      id='12345'
      name='Verba the Vocabulary Builder'
      topic = 'English Literature'
      subject = 'language'
      duration={20}
      color="#FFC8E4"
      />
     
     </section>
     <section className='home-section '>
      <CompanionList 
        title='Recently complete sessins'
        compions={recentSessions}
      />
      <CTA />
     </section>
    </div>
  )
}

export default Page