"use client";
import { useQuery } from "@tanstack/react-query";
import JobItem from "./job-item";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

interface IJob {
 id: string;
 title: string;
 description: string;
 locations: string;
 type: string;
 createdAt: string;
 authorId: string;
}

const JobsList = () => {
 const [itemOffset, setItemOffset] = useState(0);

 let endOffset, currentItems, pageCount;
 const jobsPerPage = 5;
 const { isPending, data: jobs } = useQuery({
  queryKey: ["jobs"],
  queryFn: async () => {
   const { data } = await axios.get("api/vacancy/vacancies");
   data.sort((a: IJob, b: IJob) => b.createdAt.localeCompare(a.createdAt));
   return data;
  },
 });

 if (isPending)
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
 if (jobs) {
  endOffset = itemOffset + jobsPerPage;
  currentItems = jobs.slice(itemOffset, endOffset);
  pageCount = Math.ceil(jobs.length / jobsPerPage);
 }

 const handlePageClick = (event: { selected: number }) => {
  const newOffset = (event.selected * jobsPerPage) % jobs.length;

  setItemOffset(newOffset);
 };

 return (
  <div className="w-full flex flex-col gap-4 py-4 justify-center">
   {currentItems.map((job: IJob) => (
    <Link href={`/jobs/${job.title}`} key={job.id}>
     <JobItem job={job} />
    </Link>
   ))}
   <ReactPaginate
    breakLabel="..."
    nextLabel=">"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount!}
    previousLabel="<"
    className="flex text-gray-400 gap-4 justify-center items-center"
    nextClassName="text-white"
    previousClassName="text-white"
    activeClassName="text-white text-lg font-bold"
    renderOnZeroPageCount={null}
   />
  </div>
 );
};

export default JobsList;
