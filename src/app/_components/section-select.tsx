"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
 first: "profile" | "received";
 second: "contacts" | "sent";
};

const SectionSelect = ({ first, second }: Props) => {
 const pathname = usePathname();
 return (
  <div className="my-4">
   <ul className="flex justify-start gap-8 items-center">
    <Link href={first === "profile" ? `/my/${first}` : `/messages/${first}`}>
     <li
      className={cn(
       "bg-gradient-to-r from-gray-700 to-slate-500  bg-clip-text text-transparent text-2xl font-bold",
       (pathname === `/my/${first}` || pathname === `/messages/${first}`) &&
        "text-white underline decoration-rose-600"
      )}
     >
      {first.toUpperCase()}
     </li>
    </Link>
    <Link
     href={second === "contacts" ? `/my/${second}` : `/messages/${second}`}
    >
     <li
      className={cn(
       "bg-gradient-to-r from-gray-700 to-slate-500  bg-clip-text text-transparent text-2xl font-bold",
       (pathname === `/my/${second}` || pathname === `/messages/${second}`) &&
        "text-white underline decoration-rose-600"
      )}
     >
      {second.toUpperCase()}
     </li>
    </Link>
   </ul>
  </div>
 );
};

export default SectionSelect;
