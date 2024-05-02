import { fetchVacancies } from "@/actions";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import VacancyItem from "./_components/vacancy-item";

const CreateListPage = async () => {
 const user = await currentUser();
 const fetchedUser = await db.user.findUnique({
  where: { externalId: user!.id },
 });
 const list = await fetchVacancies(fetchedUser);

 return (
  <div className="flex w-[70%] flex-col justify-center items-center mt-5 mx-auto">
   <Link href="/create-list/create">
    <Button variant="link" className="mb-5 text-2xl font-bold">
     Create Vacancy
    </Button>
   </Link>
   {list.map((vacancy) => (
    <VacancyItem key={vacancy.id} vacancy={vacancy} />
   ))}
  </div>
 );
};

export default CreateListPage;
