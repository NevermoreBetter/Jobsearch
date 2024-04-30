"use client";
import { fetchUser } from "@/actions";
import { Building, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IJob {
 job: {
  id: string;
  title: string;
  description: string;
  locations: string[];
  type: string;
  createdAt: string;
  authorId: string;
 };
}

const JobItem = ({ job }: IJob) => {
 const [user, setUser] = useState(null);

 useEffect(() => {
  const getUser = async () => {
   const userData = await fetchUser(job.authorId);
   setUser(userData);
  };

  getUser();
 }, [job.authorId]);

 if (!user) {
  return (
   <div className="flex justify-center items-center h-[250px] text-white">
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
   <div className="flex justify-start items-center gap-2 text-sm">
    <Image
     src={user.photo}
     alt={user.firstName}
     width={30}
     height={30}
     className="rounded-full"
    />
    <p>{user.firstName}</p>
    <p>{user.lastName}</p>
   </div>

   <p className="text-2xl font-bold text-white">{job.title}</p>
   <div className="flex justify-start items-center gap-4">
    <p className="flex items-center gap-2">
     <Building className="size-4" /> {job.type}
    </p>
    <p className="flex items-center gap-2">
     <MapPin className="size-4" />
     {job.locations.map((location, index) => (
      <span key={location}>
       {location}
       {index !== job.locations.length - 1 ? "," : ""}
      </span>
     ))}
    </p>
   </div>
   <p className="line-clamp-3 text-wrap">{job.description}</p>
  </div>
 );
};

export default JobItem;
