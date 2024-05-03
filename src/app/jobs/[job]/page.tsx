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

 return data && <JobDetail data={data} />;
};

export default JobPage;
