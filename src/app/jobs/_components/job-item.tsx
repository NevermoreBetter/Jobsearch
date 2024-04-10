import { Building, MapPin } from "lucide-react";

interface IJob {
 job: {
  id: string;
  title: string;
  description: string;
  locations: string;
  type: string;
  createdAt: string;
  authorId: string;
 };
}

const JobItem = ({ job }: IJob) => {
 return (
  <div className="w-[90%] h-[200px] bg-red-500 text-white px-5">
   <p>{job.title}</p>
   <div className="flex justify-start items-center gap-4">
    <p className="flex items-center gap-2">
     <Building className="size-4" /> {job.type}
    </p>
    <p className="flex items-center gap-2">
     <MapPin className="size-4" />
     {job.locations}
    </p>
   </div>
   <p className="line-clamp-5 text-wrap">{job.description}</p>
  </div>
 );
};

export default JobItem;
