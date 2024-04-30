"use client";
import { fetchUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Building, DollarSign, MapPin, Sparkle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MessageForm } from "./message-form";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

interface IData {
 data: {
  title: string;
  description: string;
  locations: string[];
  type: string;
  id: string;
  authorId: string;
  cratedAt: string;
  salary: number;
  experience: number;
 };
}

const JobDetail = ({ data }: IData) => {
 const [isPressed, setIsPressed] = useState(false);
 const currentUser = useAuth();
 const {
  isLoading,
  data: userData,
  error,
 } = useQuery({
  queryKey: ["user", data.authorId],
  queryFn: () => fetchUser(data.authorId),
 });

 if (isLoading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error.message}</div>;
 }

 return (
  <div className="flex gap-4 items-start justify-around py-4">
   <div className="w-[60%]">
    <h1 className="text-3xl font-bold mb-5"> {data.title}</h1>
    <p className="text-lg mb-5"> {data.description}</p>
    <Link
     href={`/user/${userData?.id}`}
     className="flex w-fit items-center gap-2"
    >
     <Image
      src={userData.photo}
      width={35}
      height={35}
      alt="user"
      className="rounded-full"
     />

     <p> {userData?.firstName}</p>
     <p> {userData?.lastName}</p>
    </Link>
    {userData?.externalId === currentUser.userId ? (
     <p className="mt-4 border border-white p-4 rounded-lg text-center w-[30%] font-bold">
      Your vacancy
     </p>
    ) : (
     <>
      {!isPressed ? (
       <Button
        variant={"default"}
        className="mt-5"
        onClick={() => setIsPressed(true)}
       >
        Apply for this job
       </Button>
      ) : (
       <MessageForm userData={userData} />
      )}
     </>
    )}
   </div>
   <div className="w-[20%] border border-white p-4 rounded-lg">
    <ul className="flex flex-col gap-3">
     <li className="flex gap-2">
      <DollarSign />
      {data.salary}$
     </li>
     <li className="flex gap-2">
      <Sparkle />
      {data.experience} year(s) of experience
     </li>
     <li className="flex flex-wrap ">
      <MapPin className="mr-2" />
      {data.locations.map((location, index) => (
       <span key={location} className="mr-1">
        {location}
        {index !== data.locations.length - 1 ? "," : ""}
       </span>
      ))}
     </li>
     <li className="flex gap-2">
      <Building /> {data.type}
     </li>
    </ul>
   </div>
  </div>
 );
};

export default JobDetail;
