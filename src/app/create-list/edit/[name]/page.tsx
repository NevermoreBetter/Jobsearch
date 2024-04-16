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
  vacancy = await db.vacancy.findFirst({ where: { title: props.params.name } });
 }

 return (
  <div>
   <EditForm vacancy={vacancy} />
  </div>
 );
};

export default EditPage;
