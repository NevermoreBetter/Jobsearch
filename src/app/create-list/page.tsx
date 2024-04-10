import { fetchVacancies } from "@/actions";
import {
 AlertDialogAction,
 AlertDialog,
 AlertDialogTrigger,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import {
 Building,
 DollarSign,
 MapPin,
 Pen,
 Sparkle,
 Trash,
} from "lucide-react";
import Link from "next/link";

const CreateListPage = async () => {
 const user = await currentUser();
 const fetchedUser = await db.user.findUnique({
  where: { externalId: user!.id },
 });
 const list = await fetchVacancies(fetchedUser);
 return (
  <div className="flex w-1/2 flex-col justify-center items-center mt-5 mx-auto">
   {list.map((vacancy) => {
    return (
     <div
      key={vacancy.id}
      className="w-full flex flex-col justify-center items-center bg-gray-500 px-8 py-5 rounded-lg mb-5"
     >
      <Link href={`/create-list/${vacancy.title}`} className="w-[80%]">
       <h2 className="text-2xl font-bold mb-2 text-center">{vacancy.title}</h2>
      </Link>
      <div className="flex justify-between mb-2 w-[70%] ">
       <p className="flex">
        <MapPin className="mr-1" />
        {vacancy.locations}
       </p>
       <p className="flex">
        <DollarSign className="mr-1" />
        {vacancy.salary}
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
        <Link href={`/create-list/edit/${vacancy.title}`}>
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
            This action cannot be undone. This will permanently delete your
            post.
           </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
           <AlertDialogCancel>Cancel</AlertDialogCancel>
           <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
         </AlertDialogContent>
        </AlertDialog>
       </Button>
      </div>
     </div>
    );
   })}
   <Link href="/create-list/create">
    <Button variant="link">Create Vacancy</Button>
   </Link>
  </div>
 );
};

export default CreateListPage;
