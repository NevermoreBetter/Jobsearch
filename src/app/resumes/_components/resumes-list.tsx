"use client";
import { useQuery } from "@tanstack/react-query";
import ResumeItem from "./resume-item";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

interface IResume {
 id: string;
 position: string;
 experience: number;
 location: string;
 type: string;
 createdAt: string;
 description: string;
 salary: string;
 authorId: string;
}

const ResumesList = () => {
 const [itemOffset, setItemOffset] = useState(0);
 let endOffset, currentItems, pageCount;
 const resumesPerPage = 1;
 const {
  isPending,
  data: resumes,
  error,
 } = useQuery({
  queryKey: ["resumes"],
  queryFn: async () => {
   const { data } = await axios.get("api/resume/resumes");
   return data;
  },
 });

 if (isPending) return <div>Loading...</div>;
 if (resumes) {
  endOffset = itemOffset + resumesPerPage;
  currentItems = resumes.slice(itemOffset, endOffset);
  pageCount = Math.ceil(resumes.length / resumesPerPage);
 }
 console.log(currentItems);
 const handlePageClick = (event: { selected: number }) => {
  const newOffset = (event.selected * resumesPerPage) % resumes.length;

  setItemOffset(newOffset);
 };

 return (
  <div className="w-[70%] flex flex-col gap-4 py-4 justify-center">
   {currentItems.map((resume: IResume) => (
    <Link href={`/resumes/${resume.position}`} key={resume.id}>
     <ResumeItem resume={resume} />
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

export default ResumesList;
