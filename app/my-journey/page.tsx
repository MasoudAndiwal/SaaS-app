import {Accordion,AccordionContent,AccordionItem,AccordionTrigger} from "@/components/ui/accordion"
import { getRecentSessions, getSavedCompanion, getUserCompanion, getUserSessions } from "@/lib/actions/companion.action"
import { currentUser } from "@clerk/nextjs/server"
import CompanionsList from "@/components/CompanionList"
import Image from "next/image"
import { redirect } from "next/navigation"
const profile = async () => {
  const user = await currentUser()
  if(!user) redirect('/sign-in')
    const companions = await getUserCompanion(user.id)
    const sessionHistory = await getUserSessions(user.id)
    const savedCompanions = await getSavedCompanion(user.id)
  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center max-md:flex-col">
          <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} className="rounded-full" />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit ">
            <div className="flex gap-2 items-center">
              <Image src='/icons/cap.svg' alt="cap" width={22} height={22}/>
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <div>Lessons Completed</div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit ">
            <div className="flex gap-2 items-center">
              <Image src='/icons/check.svg' alt="checkmark" width={22} height={22}/>
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>Companions Created </div>
          </div>
        </div>
      </section>

        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl font-bold ">Recent Sessions</AccordionTrigger>
            <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              compions={sessionHistory}
            />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold ">My Companions </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title='My Companions' compions={companions}/>
          </AccordionContent>
          </AccordionItem>
          {/* ------- */}
          <AccordionItem value="Saved Companions">
          <AccordionTrigger className="text-2xl font-bold ">Saved Companions </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title='Saved Companions' compions={savedCompanions}/>
          </AccordionContent>
          </AccordionItem>
        </Accordion>
    </main>
  )
}

export default profile 