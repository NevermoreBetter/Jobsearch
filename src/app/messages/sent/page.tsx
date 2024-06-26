import { fetchUser, getResumeById, getSentMessages } from "@/actions";
import SentMessage from "./_components/sent-message";

const SentPage = async () => {
 const sentMessages = await getSentMessagesWithUsers();
 return (
  <div>
   {sentMessages.length > 1 ? (
    <div>
     {sentMessages.map((message) => (
      <div
       key={message.id}
       className="border rounded-xl flex flex-col p-4 gap-4 my-4"
      >
       <SentMessage message={message} />
      </div>
     ))}
    </div>
   ) : (
    <div className="flex flex-col items-center justify-center h-full">
     <h2>No messages found</h2>
    </div>
   )}
  </div>
 );
};

const getSentMessagesWithUsers = async () => {
 const messages = await getSentMessages();
 const messagesWithUsers = await Promise.all(
  messages.map(async (message) => {
   const receiver = await fetchUser(message.recieverId);
   const resumeLink = await getResumeById(message.recieverId);
   return { ...message, receiver, resumeLink };
  })
 );
 return messagesWithUsers;
};

export default SentPage;
