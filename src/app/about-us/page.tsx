"use client";
import { useEffect, useRef } from "react";
import Item from "./_components/item";
import { data } from "./data";
import { useScroll } from "framer-motion";
import AboutForm from "./_components/about-form";
import { motion } from "framer-motion";
const AboutUs = () => {
 const container = useRef(null);
 const { scrollYProgress } = useScroll({
  target: container,
  offset: ["start start", "end end"],
 });

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;
   const locomotiveScroll = new LocomotiveScroll();
  })();
 }, []);

 return (
  <>
   <main ref={container}>
    <motion.div
     initial={{ y: -300, opacity: 0 }}
     animate={{
      y: 0,
      opacity: 1,
      transition: { duration: 1, type: "spring", stiffness: 100 },
     }}
     exit={{ y: 300, opacity: 0 }}
     className="relative pt-20"
    >
     <h1 className="text-5xl font-bold text-center mt-20">
      Get to know us better!
     </h1>
     <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className="absolute top-0"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-75 60 950 300"
     >
      <motion.path
       initial={{ pathLength: 0 }}
       transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
       animate={{ pathLength: 1 }}
       d="M227.80267333984375,107.62330627441406C245.3093986002604,106.33182637532552,538.7383748372396,75.65917958577474,556.0537719726562,83.4080581665039C573.3691691080729,91.15693674723308,569.3034383138021,243.06126770019532,552.4663696289062,252.91477966308594C535.6293009440104,262.7682916259766,257.4828006998698,273.0403308105469,240.35873413085938,268.1614074707031C223.23466756184897,263.28248413085936,231.86844746907553,167.1270438639323,231.39012145996094,161.43496704101562"
       fill="none"
       strokeWidth="6"
       stroke='url("#SvgjsLinearGradient1000")'
       strokeLinecap="round"
       strokeDasharray="0 0"
       strokeOpacity="1"
      ></motion.path>
      <defs>
       <linearGradient
        id="SvgjsLinearGradient1000"
        gradientTransform="rotate(171, 0.5, 0.5)"
       >
        <stop stopColor="hsl(28, 65%, 27%)" offset="0"></stop>
        <stop stopColor="hsl(0, 13%, 15%)" offset="1"></stop>
       </linearGradient>
      </defs>
     </svg>
    </motion.div>
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
