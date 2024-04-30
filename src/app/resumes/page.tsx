"use client";
import ResumesList from "./_components/resumes-list";
import { AnimatePresence, motion } from "framer-motion";

const ResumesPage = () => {
 return (
  <AnimatePresence>
   <motion.div
    initial={{ y: 300, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -300, opacity: 0 }}
    className="flex"
   >
    <ResumesList />
   </motion.div>
  </AnimatePresence>
 );
};

export default ResumesPage;
