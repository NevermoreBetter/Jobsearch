import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/providers/query-provider";
import Navbar from "@/components/navbar";
import { EdgeStoreProvider } from "../lib/edgestore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Jobsearch",
 description: "Find your dream job",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <ClerkProvider>
   <html lang="en">
    <body className={inter.className}>
     <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
     >
      <QueryProvider>
       <Navbar />
       <EdgeStoreProvider>{children}</EdgeStoreProvider>
       <Toaster />
      </QueryProvider>
     </ThemeProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
