"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import JobItem from "./job-item";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
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
 console.log(jobs);
 const endOffset = itemOffset + jobsPerPage;
 console.log(`Loading items from ${itemOffset} to ${endOffset}`);
 const currentItems = jobs.slice(itemOffset, endOffset);
 const pageCount = Math.ceil(jobs.length / jobsPerPage);

 const handlePageClick = (event) => {
  const newOffset = (event.selected * jobsPerPage) % jobs.length;
  console.log(
   `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setItemOffset(newOffset);
 };

 return (
  <div className="w-[70%] flex flex-col gap-4 py-4 justify-center">
   {currentItems.map((job) => (
    <JobItem key={job.id} job={job} />
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
