import { currentUser, SignInButton, UserButton } from "@clerk/nextjs";
import { BriefcaseBusinessIcon } from "lucide-react";
import Link from "next/link";

const Navbar = async () => {
 const user = await currentUser();
 return (
  <div className="nav flex justify-between items-center p-4 border border-l-[120px_solid_transparent] border-r-[120px_solid_transparent] border-gray-800">
   <Link href="/">
    <BriefcaseBusinessIcon />
   </Link>
   <div className="flex justify-between w-[35%]">
    <Link href="/messages">
     <p> Messages</p>
    </Link>
    <Link href="/jobs">
     <p> Jobs</p>
    </Link>
    <Link href="/about-us">
     <p> About us</p>
    </Link>
   </div>
   {!!user ? (
    <div className="flex items-center gap-2">
     <UserButton afterSignOutUrl="/jobs" />
     <Link href="/my/profile">
      <p>Edit</p>
     </Link>
    </div>
   ) : (
    <SignInButton />
   )}
  </div>
 );
};

export default Navbar;
