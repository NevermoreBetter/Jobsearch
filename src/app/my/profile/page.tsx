import { currentUser } from "@clerk/nextjs";
import { ProfileForm } from "./_components/profileForm";
import { db } from "@/lib/prisma";

const ProfilePage = async () => {
 let resume;
 const user = await currentUser();
 const dbUser = await db.user.findUnique({ where: { externalId: user?.id } });
 if (dbUser) {
  resume = await db.resume.findUnique({ where: { authorId: dbUser!.id } });
 }

 return (
  <div>
   <ProfileForm resume={resume} />
  </div>
 );
};

export default ProfilePage;
