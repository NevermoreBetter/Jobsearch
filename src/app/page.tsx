"use client";
import { UserButton } from "@clerk/nextjs";
import Home from "./_components/Home";
import { useEffect } from "react";

export default function HomePage() {
 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;
   const locomotiveScroll = new LocomotiveScroll();
  })();
 }, []);

 return (
  <div className="h-screen">
   <UserButton />
   <Home />
  </div>
 );
}
