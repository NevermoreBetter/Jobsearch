import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import { BriefcaseBusinessIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Jobsearch",
 description: "Find your dream job",
};

export default function MainLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <>
   <Navbar />
   {children}
   <Toaster />
  </>
 );
}
