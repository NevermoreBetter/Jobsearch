"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { BriefcaseBusinessIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUserStore } from "@/store/index";
import { Toggle } from "./ui/toggle";
import { useRouter } from "next/navigation";

const Navbar = () => {
 const router = useRouter();
 const { isSignedIn } = useUser();
 const mode = useUserStore((state) => state.mode);
 const setMode = useUserStore((state) => state.setMode);
 return (
  <div className="nav flex justify-between items-center p-4 border border-l-[120px_solid_transparent] border-r-[120px_solid_transparent] border-gray-800">
   <Link href="/">
    <BriefcaseBusinessIcon />
   </Link>
   <div className="flex justify-between w-[35%]">
    <Link href="/messages/received">
     <motion.p
      whileHover={{ scale: 1.1, color: "#dda15e" }}
      whileTap={{ scale: 0.9 }}
     >
      {" "}
      Messages
     </motion.p>
    </Link>
    {mode === "Searching" ? (
     <Link href="/jobs">
      <motion.p
       whileHover={{ scale: 1.1, color: "#dda15e" }}
       whileTap={{ scale: 0.9 }}
      >
       Jobs
      </motion.p>
     </Link>
    ) : (
     <>
      <Link href="/resumes">
       <motion.p
        whileHover={{ scale: 1.1, color: "#dda15e" }}
        whileTap={{ scale: 0.9 }}
       >
        Resumes
       </motion.p>
      </Link>
      <Link href="/create-list">
       <motion.p
        whileHover={{ scale: 1.1, color: "#dda15e" }}
        whileTap={{ scale: 0.9 }}
       >
        Post a job
       </motion.p>
      </Link>
     </>
    )}
    <Link href="/about-us">
     <motion.p
      whileHover={{ scale: 1.1, color: "#dda15e" }}
      whileTap={{ scale: 0.9 }}
     >
      About us
     </motion.p>
    </Link>
   </div>
   {isSignedIn ? (
    <div className="flex items-center gap-2">
     <Toggle
      onClick={() =>
       mode === "Searching"
        ? (setMode("Hiring"), router.push("/resumes"))
        : (setMode("Searching"), router.push("/jobs"))
      }
      className="text-base"
     >
      {mode}
     </Toggle>
     <UserButton afterSignOutUrl="/jobs" />
     <Link href="/my/profile">
      <motion.p
       whileHover={{ scale: 1.1, color: "#dda15e" }}
       whileTap={{ scale: 0.9 }}
      >
       Edit
      </motion.p>
     </Link>
    </div>
   ) : (
    <SignInButton />
   )}
  </div>
 );
};

export default Navbar;
