"use client";
import { fetchUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Banknote, Building, MapPin, Sparkle } from "lucide-react";
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
      src={userData!.photo}
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
      <Banknote />
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
