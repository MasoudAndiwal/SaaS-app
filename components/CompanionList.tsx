import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";
interface CompanionsListProps {
  title: string;
  compions? : Companion[];
  className?: string;
}
const CompanionList =({title , compions , className}: CompanionsListProps) => {
  return (
    <article className={cn('companion-list', className)}>
       <p className="font-black text-3xl max-sm:text-center">{title}</p>
       <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3">Lessons</TableHead>
              <TableHead className="text-lg">Subject</TableHead>
              <TableHead className="text-lg">Duration</TableHead>
             </TableRow>
          </TableHeader>
          <TableBody>
            {compions?.map(({id, name, topic, subject, duration}) => (
                <TableRow key={id}>
                    <TableCell>
                        <Link href={`/companions/${id}`}>
                            <div className="flex items-center gap-2 w-full">
                                <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden max-sm:flex size-[52px]" style={{backgroundColor: getSubjectColor(subject)}}>
                                    <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
                                </div>
                              <div className="flex flex-col gap-2">
                                <p className="font-bold text-2xl max-sm:hidden">{name}</p>
                                <p className="text-lg max-sm:hidden">{ topic ? `${topic.slice(0, 25)}${topic.length > 25 ? '...' : ''}` : 'No topic' }</p>
                              </div>
                            </div>
                        </Link>
                    </TableCell>
                    <TableCell>
                      <div className="subject-badge w-fit max-md:hidden max-sm:flex">
                      {subject}
                      </div>
                      <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden max-sm:hidden" style={{backgroundColor: getSubjectColor(subject)}}>
                      <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                      </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center justify-start gap-2">
                          <p className="text-2xl">{duration} {' '}
                          <span className="max-md:hidden">mins</span>
                          </p>
                          <Image src='/icons/clock.svg' alt='duration' width={14.5} height={14.5} className="md:hidden" />
                        </div>
                    </TableCell>
                </TableRow>
            ))}
          
          </TableBody>
        </Table>
    </article>
  )
}

export default CompanionList