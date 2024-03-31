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
 locations: string[];
 type: string;
 createdAt: string;
 authorId: string;
}

const JobsList = () => {
 const [itemOffset, setItemOffset] = useState(0);
 const jobsPerPage = 1;
 const {
  isPending,
  data: jobs,
  error,
 } = useQuery({
  queryKey: ["jobs"],
  queryFn: async () => {
   const { data } = await axios.get("api/vacancy/vacancies");
   return data;
  },
 });

 if (isPending) return <div>Loading...</div>;
 const endOffset = itemOffset + jobsPerPage;
 const currentItems = jobs.slice(itemOffset, endOffset);
 const pageCount = Math.ceil(jobs.length / jobsPerPage);

 const handlePageClick = (event: { selected: number }) => {
  const newOffset = (event.selected * jobsPerPage) % jobs.length;
  console.log(
   `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
 };

 return (
  <div className="w-[70%] flex flex-col gap-4 py-4 justify-center">
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
    pageCount={pageCount}
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
