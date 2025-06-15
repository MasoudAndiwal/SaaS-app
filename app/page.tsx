import CompanionCard from '@/components/CompanionCard'

// Force dynamic rendering because this page uses headers (e.g., Clerk/Supabase auth) which prevents static generation
export const dynamic = "force-dynamic";
import CTA from '@/components/Cta'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.action'
import { getSubjectColor } from '@/lib/utils'
import CompanionList from '@/components/CompanionList'

const Page = async () => {
    const companions = await  getAllCompanions({limit : 2})
    const recentSessionsCompanions = await getRecentSessions(10);
  return (
    <main className=''>
     <h1 className='text-left'>Popular Companions</h1>
     <section className='home-section'>
      {companions.map((companion ) => (
        <CompanionCard 
        key={companion.id}
        {...companion}
        color={getSubjectColor(companion.subject)}
        />
      ))}
     </section>
     <section className='home-section items-start'>   
      <CompanionList
      title="Recenty Completed sessions"
      compions={recentSessionsCompanions}
      className='w-2/3 max-lg:w-full !items-start'
      />
      <CTA />
     </section>
    </main>
  )
}

export default Page