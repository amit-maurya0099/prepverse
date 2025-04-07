import Image from "next/image";
import dayjs from "dayjs";
import { randomInterviewCovers } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcons from "./DisplayTechIcons";

const InterviewCard = ({data}) => {
      
    const feedback = null;
     const normalizedType = /mix/gi.test(data?.type) ? "Mixed" : data.type;
     const formattedDate = dayjs(feedback?.createdAt || data?.createdAt || dayjs(Date.now())).format('MMM D, YYYY');
     

  return (
    <div className="card-border w-[320px] max-sm:w-full min-h-80 ">
      <div className="card-interview ]">
        <div >
            <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                <p className="badge-text">{normalizedType}</p>
            </div>
            <Image src={randomInterviewCovers()} alt="cover-image" width={60}  height={60}className="rounded-full object-fit " />
            <h3 className="mt-5 capitalize text-lg">{data.role} Interview</h3>
            <div className="flex gap-5 ">
                <div className="flex gap-2 items-center">
                    <Image src="/calendar.svg" alt="calender" width={16} height={16}/>
                    <p className="text-sm mt-1">{formattedDate}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <Image src="/star.svg" alt="star" width={16} height={16}></Image>
                    <p>{feedback?.totalScore || '---'}/100</p>
                </div>
            </div>
            <p className="line-clamp-2 mt-3 text-sm">
                {feedback?.finalAssessment || "You have'nt taken the interview yet. Take it now to improve your skills."}
            </p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-500 pt-5">
            <DisplayTechIcons techStack={data?.techstack}/>
             <Button className="btn-primary">
                <Link href={feedback?`/interview/${data.id}/feedback` : `/interview/${data.id}`}>
                 {feedback? "Check Feedback":"View Interview"}
                </Link>
             </Button>
        </div>

      </div>
    </div>
  )
}

export default InterviewCard
