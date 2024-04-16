"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import JobDetail from "./_components/job-detail";

interface IParams {
 job: string;
}

const JobPage = ({ params }: { params: IParams }) => {
 const { isPending, data } = useQuery({
  queryKey: ["job"],
  queryFn: async () => {
   const { data } = await axios.get(`/api/vacancy/${params.job}`);
   return data;
  },
 });

 if (isPending) {
  return <div>Loading...</div>;
 }

 return data && <JobDetail data={data} />;
};

export default JobPage;
