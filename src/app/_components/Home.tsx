"use client";
import { gsap } from "gsap";
import { TextPlugin, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import WeProvide from "./we-provide";

const Home = () => {
 const paragraph = useRef<HTMLDivElement | null>(null);
 const bgImage = useRef<HTMLDivElement | null>(null);

 useGSAP(
  () => {
   gsap.registerPlugin(TextPlugin, useGSAP, ScrollTrigger);

   const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

   tl
    .to("#change", {
     duration: 2,
     text: "job",
    })
    .to("#change", {
     duration: 0.5,
     delay: 1,
     text: "",
    })
    .to("#change", {
     duration: 3,
     delay: 2,
     text: "opportunity",
    })
    .to("#change", {
     duration: 0.5,
     delay: 1,
     text: "",
    })
    .to("#change", {
     duration: 3,
     delay: 2,
     text: "career",
    })
    .to("#change", {
     duration: 0.5,
     delay: 1,
     text: "",
    });
  },
  { scope: paragraph }
 );

 return (
  <>
   <section className="first h-screen">
    <div ref={bgImage} className="z-10">
     <Image
      data-scroll
      data-scroll-speed="0.3"
      src={"/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg"}
      fill={true}
      className="brightness-[.4]"
      alt="background"
     />
    </div>
    <div
     ref={paragraph}
     data-scroll
     data-scroll-speed="0.7"
     className="relative h-full w-full "
    >
     <h1 className="inline-block absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-white">
      Find your dream{" "}
      <span id="change" className="underline uppercase text-rose-500"></span>
     </h1>
    </div>
   </section>
   <section className="second w-full h-[85vh] flex flex-col items-center pt-10 gap-5 text-4xl">
    <WeProvide />
   </section>
  </>
 );
};

export default Home;
