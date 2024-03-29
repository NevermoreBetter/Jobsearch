import { currentUser } from "@clerk/nextjs";
import { ContactForm } from "./_components/contactForm";
import { db } from "@/lib/prisma";

const ContactsPage = async () => {
 const auth = await currentUser();
 const user = await db.user.findUnique({ where: { externalId: auth!.id } });
 return (
  <div>
   <ContactForm user={user} />
  </div>
 );
};

export default ContactsPage;
