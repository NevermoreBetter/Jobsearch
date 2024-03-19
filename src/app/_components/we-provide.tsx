"use client";
import { gsap } from "gsap";
import { TextPlugin, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const WeProvide = () => {
 const liElLeft = useRef<HTMLLIElement[]>([]);
 const liElRight = useRef<HTMLLIElement[]>([]);

 useGSAP(() => {
  gsap.registerPlugin(TextPlugin, useGSAP, ScrollTrigger);

  const liLeftElements = liElLeft.current;
  const liRightElements = liElRight.current;

  liLeftElements.forEach((liElement, index) => {
   gsap.from(liElement, {
    scrollTrigger: {
     trigger: liElement,
     start: "0px bottom",
     end: "+=200px",
     scrub: true,
    },
    left: "-200px",
    opacity: 0,
    delay: index * 0.2,
   });
  });

  liRightElements.forEach((liElement, index) => {
   gsap.from(liElement, {
    scrollTrigger: {
     trigger: liElement,
     start: "0px bottom",
     end: "+=200px",
     scrub: true,
    },
    right: "-200px",
    opacity: 0,
    delay: index * 0.2,
   });
  });
 });

 const addToLeftRefs = (el: HTMLLIElement) => {
  if (el && !liElLeft.current.includes(el)) {
   liElLeft.current.push(el);
  }
 };

 const addToRigthRefs = (el: HTMLLIElement) => {
  if (el && !liElRight.current.includes(el)) {
   liElRight.current.push(el);
  }
 };

 return (
  <>
   <h2 className="text-5xl text-rose-500 font-bold uppercase">We provide:</h2>
   <div className="flex justify-between items-start w-[80%]">
    <div className="w-1/2 flex flex-col items-center justify-center gap-5">
     <p className="text-4xl font-bold uppercase bg-gradient-to-r from-slate-500 to-gray-700 bg-clip-text text-transparent mb-4">
      For Job Seekers:
     </p>
     <ul className="flex items-center justify-center flex-col gap-10">
      <li ref={addToLeftRefs} className="relative ">
       Extensive Job Listings
      </li>
      <li ref={addToLeftRefs} className="relative">
       Advanced Search Filters
      </li>
      <li ref={addToLeftRefs} className="relative">
       Resume Building Tools
      </li>
      <li ref={addToLeftRefs} className="relative">
       Customized Job Alerts
      </li>
      <li ref={addToLeftRefs} className="relative">
       Career Resources
      </li>
     </ul>
    </div>
    <div className="w-1/2 flex flex-col items-center justify-center gap-5">
     <p className="text-4xl font-bold uppercase bg-gradient-to-r from-gray-700 to-slate-500  bg-clip-text text-transparent mb-4">
      For Employers:
     </p>
     <ul className="flex flex-col items-center justify-center gap-10">
      <li ref={addToRigthRefs} className="relative">
       Targeted Job Postings
      </li>
      <li ref={addToRigthRefs} className="relative">
       Candidate Management System
      </li>
      <li ref={addToRigthRefs} className="relative">
       Branding Opportunities
      </li>
      <li ref={addToRigthRefs} className="relative">
       Analytics and Insights
      </li>
      <li ref={addToRigthRefs} className="relative">
       Dedicated Support
      </li>
     </ul>
    </div>
   </div>
  </>
 );
};

export default WeProvide;
