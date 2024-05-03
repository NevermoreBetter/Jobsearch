"use client";
import { fetchUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { MessageForm } from "./message-form";
import { Banknote, Building, MapPin, Sparkle } from "lucide-react";

interface IData {
 data: {
  position: string;
  description: string;
  location: string;
  type: string[];
  id: string;
  authorId: string;
  cratedAt: string;
  salary: number;
  experience: number;
 };
}

const ResumeDetail = ({ data }: IData) => {
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
    <h1 className="text-3xl font-bold mb-5"> {data.position}</h1>
    <p className="text-lg mb-5"> {data.description}</p>
    <div className="flex items-center gap-2">
     <Image
      src={userData!.photo}
      width={35}
      height={35}
      alt="user"
      className="rounded-full"
     />

     <p> {userData?.firstName}</p>
     <p> {userData?.lastName}</p>
    </div>
    {userData?.externalId === currentUser.userId ? (
     <p className="mt-4 border border-white p-4 rounded-lg text-center w-[30%] font-bold">
      Your resume
     </p>
    ) : (
     <>
      {!isPressed ? (
       <Button
        variant={"default"}
        className="mt-5"
        onClick={() => setIsPressed(true)}
       >
        Write a message
       </Button>
      ) : (
       <MessageForm userData={userData} />
      )}
     </>
    )}
   </div>
   <div className="w-[20%] border border-white p-4 rounded-lg">
    <ul className="flex flex-col gap-3">
     <p className="flex gap-2">
      <Banknote />
      {data.salary}$
     </p>
     <p className="flex gap-2">
      <Sparkle />
      {data.experience} year(s) of experience
     </p>
     <ul className="flex gap-2">
      <MapPin />
      {data.location}
     </ul>
     <div className="flex gap-2">
      <Building />
      {data.type.map((type, index) => (
       <span key={type}>
        {type}
        {index !== data.type.length - 1 ? ", " : ""}
       </span>
      ))}
     </div>
    </ul>
   </div>
  </div>
 );
};

export default ResumeDetail;
