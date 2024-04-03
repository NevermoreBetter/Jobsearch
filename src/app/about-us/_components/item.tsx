import { MotionValue, useTransform, motion } from "framer-motion";
import { useEffect } from "react";

interface IProps {
 title: string;
 description: string;
 color: string;
 i: number;
 progress: MotionValue<number>;
 range: number[];
 target: number;
}

const Item = ({
 title,
 description,
 color,
 i,
 progress,
 range,
 target,
}: IProps) => {
 const scale = useTransform(progress, range, [1, target]);

 useEffect(() => {
  (async () => {
   const LocomotiveScroll = (await import("locomotive-scroll")).default;
   const locomotiveScroll = new LocomotiveScroll();
  })();
 }, []);

 return (
  <div className="h-screen w-full flex flex-col justify-center items-center gap-4 sticky top-0 ">
   <motion.div
    style={{
     scale,
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "flex-start",
     padding: "2.5rem",
     borderRadius: "0.5rem",
     gap: "1rem",
     height: "300px",
     position: "relative",
     backgroundColor: color,
     top: `calc(-10% + ${i * 25}px)`,
    }}
   >
    <h1 className="font-bold text-2xl">{title}</h1>
    <p className="text-xl">{description}</p>
   </motion.div>
  </div>
 );
};

export default Item;
