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
  <div className="w-full h-[250px] flex flex-col gap-3 justify-start items-start bg-gray-500 px-8 py-5 rounded-lg mb-5">
   <p className="text-2xl font-bold text-white">{resume.position}</p>
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
