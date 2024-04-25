import type { Metadata } from "next";
import SectionSelect from "../_components/section-select";

export const metadata: Metadata = {
 title: "Jobsearch",
 description: "Find your dream job",
};

export default function ProfileLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <SectionSelect first={"received"} second={"sent"} />
   {children}
  </>
 );
}
