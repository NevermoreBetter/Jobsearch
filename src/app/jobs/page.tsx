import { ModeToggle } from "@/components/theme-toggle";
import React from "react";
import JobsSidebar from "./_components/jobs-sidebar";
import JobsList from "./_components/jobs-list";

const JobsPage = () => {
 return (
  <div className="flex">
   <JobsList />
  </div>
 );
};

export default JobsPage;
