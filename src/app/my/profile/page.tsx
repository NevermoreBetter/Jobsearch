import { currentUser } from "@clerk/nextjs";
import { ProfileForm } from "./_components/profileForm";
import { db } from "@/lib/prisma";

const ProfilePage = async () => {
 const user = await currentUser();
 const resume = await db.resume.findUnique({ where: { authorId: user!.id } });
 return (
  <div>
   <ProfileForm resume={resume} />
  </div>
 );
};

export default ProfilePage;
