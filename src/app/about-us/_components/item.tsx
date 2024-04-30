import { MotionValue, useTransform, motion } from "framer-motion";
import Image from "next/image";

interface IProps {
 title: string;
 description: string;
 color: string;
 i: number;
 progress: MotionValue<number>;
 range: number[];
 target: number;
 img: string;
}

const Item = ({
 title,
 description,
 color,
 i,
 progress,
 range,
 target,
 img,
}: IProps) => {
 const scale = useTransform(progress, range, [1, target]);

 return (
  <div className="h-screen w-full flex flex-col justify-center items-center gap-4 sticky top-0 ">
   <motion.div
    style={{
     scale,
     display: "flex",
     alignItems: "center",
     justifyContent: "space-between",
     padding: "2.5rem",
     borderRadius: "0.5rem",
     gap: "1rem",
     height: "300px",
     position: "relative",
     backgroundColor: color,
     top: `calc(-10% + ${i * 25}px)`,
    }}
    initial={{ y: 300, opacity: 0 }}
    animate={{
     y: 0,
     opacity: 1,
     transition: { duration: 1, type: "spring", stiffness: 100 },
    }}
    exit={{ y: -300, opacity: 0 }}
   >
    <div className="w-2/3 flex flex-col gap-2 justify-center items-start">
     <h1 className="font-bold text-2xl">{title}</h1>
     <p className="text-xl">{description}</p>
    </div>
    <div className="h-full w-[20%] flex justify-center items-center p-4 relative">
     <Image src={img} alt={title} fill />
    </div>
   </motion.div>
  </div>
 );
};

export default Item;
