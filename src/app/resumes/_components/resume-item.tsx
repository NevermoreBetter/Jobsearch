import { Building, MapPin } from "lucide-react";

interface IResume {
 resume: {
  id: string;
  position: string;
  experience: number;
  location: string;
  type: string;
  createdAt: string;
  description: string;
  salary: string;
  authorId: string;
 };
}

const ResumeItem = ({ resume }: IResume) => {
 return (
  <div className="w-[90%] h-[200px] bg-red-500 text-white px-5">
   <p>{resume.position}</p>
   <div className="flex justify-start items-center gap-4">
    <p className="flex items-center gap-2">
     <Building className="size-4" /> {resume.type}
    </p>
    <p className="flex items-center gap-2">
     <MapPin className="size-4" />
     {resume.location}
    </p>
   </div>
   <p className="line-clamp-5 text-wrap">{resume.description}</p>
  </div>
 );
};

export default ResumeItem;
