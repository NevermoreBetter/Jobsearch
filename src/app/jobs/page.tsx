"use client";
import React from "react";
import JobsList from "./_components/jobs-list";
import { AnimatePresence, motion } from "framer-motion";

const JobsPage = () => {
 return (
  <AnimatePresence>
   <motion.div
    key={"jobs"}
    initial={{ y: 300, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -300, opacity: 0 }}
    className="flex"
   >
    <JobsList />
   </motion.div>
  </AnimatePresence>
 );
};

export default JobsPage;
