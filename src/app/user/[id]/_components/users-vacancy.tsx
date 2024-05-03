import { Banknote, Building, MapPin } from "lucide-react";
import Link from "next/link";

interface IVacancy {
 vacancy: {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  locations: string[];
  type: string;
  salary: string;
  experience: number;
  authorId: string;
 };
}

const UsersVacancy = ({ vacancy }: IVacancy) => {
 if (!vacancy) {
  return (
   <div className="flex justify-center items-center h-[250px] w-full text-white">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="1em"
     height="1em"
     viewBox="0 0 24 24"
    >
     <path
      fill="currentColor"
      d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
     >
      <animateTransform
       attributeName="transform"
       dur="0.75s"
       repeatCount="indefinite"
       type="rotate"
       values="0 12 12;360 12 12"
      ></animateTransform>
     </path>
    </svg>
   </div>
  );
 }

 return (
  <div className="w-full h-[250px] flex flex-col gap-3 justify-start items-start bg-gray-500 px-8 py-5 rounded-lg mb-5 animate-fade-in">
   <Link
    href={`/jobs/${vacancy.title}`}
    className="text-2xl font-bold text-white"
   >
    {vacancy.title}
   </Link>
   <div className="flex justify-start items-center gap-4">
    <p className="flex items-center gap-2">
     <Building className="size-4" /> {vacancy.type}
    </p>
    <p className="flex items-center gap-2">
     <MapPin className="size-4" />
     {vacancy.locations.map((location: string, index: number) => (
      <span key={location}>
       {location}
       {index !== vacancy.locations.length - 1 ? "," : ""}
      </span>
     ))}
    </p>
    <p className="flex items-center gap-2">
     <Banknote />
     {vacancy.salary} $
    </p>
   </div>
   <p className="line-clamp-3 text-wrap">{vacancy.description}</p>
  </div>
 );
};

export default UsersVacancy;
