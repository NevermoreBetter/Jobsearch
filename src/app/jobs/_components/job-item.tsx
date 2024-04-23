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
  locations: string;
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
  return <div>Loading...</div>;
 }

 console.log(user);
 return (
  <div className="w-full h-[250px] flex flex-col gap-3 justify-start items-start bg-gray-500 px-8 py-5 rounded-lg mb-5">
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
     {job.locations}
    </p>
   </div>
   <p className="line-clamp-3 text-wrap">{job.description}</p>
  </div>
 );
};

export default JobItem;
