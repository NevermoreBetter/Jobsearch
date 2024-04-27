"use client";
import { deleteVacancy } from "@/actions";
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
 AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
 Building,
 DollarSign,
 MapPin,
 Pen,
 Sparkle,
 Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VacancyItemProps {
 vacancy: {
  id: string;
  title: string;
  locations: string[];
  salary: string;
  type: string;
  experience: number;
  description: string;
 };
}

const VacancyItem = ({ vacancy }: VacancyItemProps) => {
 const route = useRouter();
 const deleteVac = async (id: string) => {
  await deleteVacancy(id);
  route.refresh();
 };
 return (
  <div className="w-full flex flex-col justify-center items-center bg-gray-500 px-8 py-5 rounded-lg mb-5">
   <Link href={`/create-list/${vacancy.title}`} className="w-[80%]">
    <h2 className="text-2xl font-bold mb-2 text-center">{vacancy.title}</h2>
   </Link>
   <div className="flex justify-between mb-2 w-[90%]">
    <div className="w-1/4  flex flex-wrap overflow-hidden line-clamp-2">
     <MapPin className="mr-1" />
     {vacancy.locations.map((location, index) => (
      <span key={location} className="mr-1">
       {location}
       {index !== vacancy.locations.length - 1 ? "," : ""}
      </span>
     ))}
    </div>
    <p className="flex">
     <DollarSign className="mr-1" />
     {vacancy.salary}$
    </p>
    <p className="flex">
     <Building className="mr-1" /> {vacancy.type}
    </p>
    <p className="flex">
     <Sparkle className="mr-1" />
     {vacancy.experience} year(s)
    </p>
   </div>
   <p className="self-start">{vacancy.description}</p>
   <div className="self-end">
    <Button variant={"ghost"}>
     <Link href={`/create-list/edit/${vacancy.id}`}>
      <Pen />
     </Link>
    </Button>
    <Button variant={"ghost"}>
     <AlertDialog>
      <AlertDialogTrigger asChild>
       <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
       <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
         This action cannot be undone. This will permanently delete your post.
        </AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => deleteVac(vacancy.id)}>
         Continue
        </AlertDialogAction>
       </AlertDialogFooter>
      </AlertDialogContent>
     </AlertDialog>
    </Button>
   </div>
  </div>
 );
};

export default VacancyItem;
