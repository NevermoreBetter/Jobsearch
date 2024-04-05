"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ResumeDetail from "./_components/resume-detail";

interface IParams {
 resume: string;
}

const ResumePage = ({ params }: { params: IParams }) => {
 const { isPending, data, error } = useQuery({
  queryKey: ["resume"],
  queryFn: async () => {
   const { data } = await axios.get(`/api/resume/${params.resume}`);
   return data;
  },
 });

 if (isPending) {
  return <div>Loading...</div>;
 }

 return data && <ResumeDetail data={data} />;
};

export default ResumePage;
