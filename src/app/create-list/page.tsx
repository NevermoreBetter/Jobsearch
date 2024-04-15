import { deleteVacancy, fetchVacancies } from "@/actions";
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
import VacancyItem from "./_components/vacancy-item";
import { revalidatePath } from "next/cache";

const CreateListPage = async () => {
 const user = await currentUser();
 const fetchedUser = await db.user.findUnique({
  where: { externalId: user!.id },
 });
 const list = await fetchVacancies(fetchedUser);

 return (
  <div className="flex w-1/2 flex-col justify-center items-center mt-5 mx-auto">
   {list.map((vacancy) => (
    <VacancyItem key={vacancy.id} vacancy={vacancy} />
   ))}
   <Link href="/create-list/create">
    <Button variant="link">Create Vacancy</Button>
   </Link>
  </div>
 );
};

export default CreateListPage;
