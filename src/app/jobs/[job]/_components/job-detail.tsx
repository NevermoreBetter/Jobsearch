"use client";
import { fetchUser } from "@/actions";
import { useQuery } from "@tanstack/react-query";

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
 const {
  isLoading,
  data: userData,
  error,
 } = useQuery({
  queryKey: ["user", data.authorId],
  queryFn: () => fetchUser(data),
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
    <h1> {data.title}</h1>
    <p> {data.description}</p>
   </div>
   <div className="w-[20%] border border-white p-4 rounded-lg">
    <p>{data.salary}</p>
    <p>{data.experience}</p>
    <ul className="flex gap-2">
     {data.locations.map((location) => (
      <li key={location}>{location}</li>
     ))}
    </ul>
    <p> {data.type}</p>
    <div className="flex gap-2">
     <p> {userData?.firstName}</p>
     <p> {userData?.lastName}</p>
    </div>
   </div>
  </div>
 );
};

export default JobDetail;
