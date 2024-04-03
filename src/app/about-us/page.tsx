"use client";
import { useRef } from "react";
import Item from "./_components/item";
import { data } from "./data";
import { useScroll } from "framer-motion";
import AboutForm from "./_components/about-form";
import Navbar from "@/components/navbar";
const AboutUs = () => {
 const container = useRef(null);
 const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start start", "end end"],
 });
 return (
  <>
   <Navbar />
   <main ref={container} className="mb-[10vh] ">
    {data.map((d, index) => {
     const targetScale = 1 - (data.length - index) * 0.05;
     return (
      <Item
       {...d}
       i={index}
       key={index}
       progress={scrollYProgress}
       range={[index * 0.25, 1]}
       target={targetScale}
      />
     );
    })}
   </main>
   <AboutForm />
  </>
 );
};

export default AboutUs;
