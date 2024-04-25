import { fetchUser, getReceivedMessages, getResumeById } from "@/actions";
import ReceivedMessage from "./_components/received-message";

const ReceivedPage = async () => {
 const receivedMessages = await getReceivedMessagesWithUsers();
 return (
  <div>
   {receivedMessages.map((message) => (
    <div
     key={message.id}
     className="border rounded-xl flex flex-col p-4 gap-4 my-4"
    >
     <ReceivedMessage message={message} />
    </div>
   ))}
  </div>
 );
};

const getReceivedMessagesWithUsers = async () => {
 const messages = await getReceivedMessages();
 const messagesWithUsers = await Promise.all(
  messages.map(async (message) => {
   const sender = await fetchUser(message.senderId);
   const resumeLink = await getResumeById(message.senderId);
   return { ...message, sender, resumeLink };
  })
 );
 return messagesWithUsers;
};

export default ReceivedPage;
