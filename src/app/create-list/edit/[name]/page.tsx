import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import EditForm from "./_components/editForm";

const EditPage = async (props: { params: { name: string } }) => {
 let vacancy;
 const user = await currentUser();
 const dbUser = await db.user.findUnique({
  where: { externalId: user?.id },
 });
 if (dbUser) {
  vacancy = await db.vacancy.findFirst({ where: { id: props.params.name } });
 }
 console.log(props.params.name);
 console.log(vacancy);

 return (
  <div className="flex justify-center items-center mt-5">
   <EditForm vacancy={vacancy} />
  </div>
 );
};

export default EditPage;
