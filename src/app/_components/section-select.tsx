"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const SectionSelect = () => {
 const pathname = usePathname();
 return (
  <div className="my-4">
   <ul className="flex justify-start gap-8 items-center">
    <Link href={"/my/profile"}>
     <li
      className={cn(
       "bg-gradient-to-r from-gray-700 to-slate-500  bg-clip-text text-transparent text-2xl font-bold",
       pathname === "/my/profile" && "text-white underline decoration-rose-600"
      )}
     >
      Profile
     </li>
    </Link>
    <Link href={"/my/contacts"}>
     <li
      className={cn(
       "bg-gradient-to-r from-gray-700 to-slate-500  bg-clip-text text-transparent text-2xl font-bold",
       pathname === "/my/contacts" && "text-white underline decoration-rose-600"
      )}
     >
      Contacts
     </li>
    </Link>
   </ul>
  </div>
 );
};

export default SectionSelect;
