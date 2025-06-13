import CompanionCard from '@/components/CompanionCard';
import { getAllCompanions } from '@/lib/actions/companion.action';
import { getSubjectColor } from '@/lib/utils';
import SearchInput from '@/components/SearchInput';
import Subjectfilter from '@/components/Subjectfilter';

const page = async ({searchParams}: {searchParams: {subject?: string , topic?: string}}) => {
  const filterParams = await searchParams;
  const subject = filterParams.subject ? filterParams.subject : '';
  const topic = filterParams.topic ? filterParams.topic : '';
  const companions = await getAllCompanions({ subject , topic });
  return (
    <main>
    <section className='flex justify-between gap-4 max-sm:flex-col'>
      <h1>Companion Library</h1>
      <div className='flex gap-4'>
        <SearchInput/>
        <Subjectfilter/>
      </div>
    </section>
    <section className='companions-grid'>
      {companions.map(companion => (
        <CompanionCard
          key={companion.id}
          {...companion}
          color={getSubjectColor(companion.subject)}
        />
      ))}
    </section>
    </main>
  )
}

export default page