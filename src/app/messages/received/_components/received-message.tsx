import { FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IMessage {
 message: {
  id: string;
  body: string | null;
  resume: string | null;
  createdAt: Date;
  senderId: string;
  recieverId: string;
  resumeLink: {
   position: string;
   type: string[];
   experience: number;
   location: string;
   description: string;
   id: string;
   salary: string;
   createdAt: Date;
   published: boolean;
  } | null;
  sender: {
   id: string;
   externalId: string | null;
   firstName: string | null;
   lastName: string | null;
   photo: string;
   email: string;
   createdAt: Date;
  } | null;
 };
}

const ReceivedMessage = ({ message }: IMessage) => {
 return (
  <>
   <Link
    href={`/resumes/${message.resumeLink?.position}`}
    className="flex items-center p-2 gap-2"
   >
    <Image
     src={message.sender!.photo}
     alt="photo"
     className="rounded-full w-10 h-10 mr-2"
     width={40}
     height={40}
    />
    <p>{message.sender?.firstName}</p>
    <p>{message.sender?.lastName}</p>
   </Link>
   <p>{message.body}</p>
   {message.resume === null ? (
    ""
   ) : (
    <a href={message.resume} className="flex w-fit items-center gap-2">
     <FileText />
     Resume
    </a>
   )}
  </>
 );
};

export default ReceivedMessage;
