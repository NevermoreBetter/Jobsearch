"use client";
import { fetchUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { MessageForm } from "./message-form";

interface IData {
 data: {
  title: string;
  description: string;
  location: string;
  type: string;
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
  return <div>Loading...</div>;
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
      src={userData.photo}
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
    <p>{data.salary}</p>
    <p>{data.experience}</p>
    <ul className="flex gap-2">{data.location}</ul>
    <p> {data.type}</p>
   </div>
  </div>
 );
};

export default ResumeDetail;
