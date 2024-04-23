import { fetchUser, getMessages, getResumeById } from "@/actions";
import { FileText } from "lucide-react";
import Link from "next/link";

const Messages = async () => {
 const messages = await getMessagesWithUsers();
 console.log(messages);
 return (
  <div>
   {messages.map((message) => (
    <div
     key={message.id}
     className="border rounded-xl flex flex-col p-4 gap-4 my-4"
    >
     <Link
      href={`/resumes/${message.resumeLink?.position}`}
      className="flex items-center p-2 gap-2"
     >
      <img
       src={message.sender?.photo}
       alt="photo"
       className="rounded-full w-10 h-10 mr-2"
      />
      <p>{message.sender?.firstName}</p>
      <p>{message.sender?.lastName}</p>
     </Link>
     <p>{message.body}</p>
     {message.resume === null ? (
      <div> No resume</div>
     ) : (
      <a href={message.resume} className="flex items-center gap-2">
       <FileText />
       Resume
      </a>
     )}
    </div>
   ))}
  </div>
 );
};

const getMessagesWithUsers = async () => {
 const messages = await getMessages();
 const messagesWithUsers = await Promise.all(
  messages.map(async (message) => {
   const sender = await fetchUser(message.senderId);
   const resumeLink = await getResumeById(message.senderId);
   return { ...message, sender, resumeLink };
  })
 );
 return messagesWithUsers;
};

export default Messages;
