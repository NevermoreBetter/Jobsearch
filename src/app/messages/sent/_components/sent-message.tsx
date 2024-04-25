import { FileText } from "lucide-react";
import Link from "next/link";

const SentMessage = ({ message }) => {
 return (
  <>
   <Link
    href={`/resumes/${message.resumeLink?.position}`}
    className="flex items-center p-2 gap-2"
   >
    <img
     src={message.receiver?.photo}
     alt="photo"
     className="rounded-full w-10 h-10 mr-2"
    />
    <p>{message.receiver?.firstName}</p>
    <p>{message.receiver?.lastName}</p>
   </Link>
   <p>{message.body}</p>
   {message.resume === null ? (
    ""
   ) : (
    <a href={message.resume} className="flex items-center gap-2">
     <FileText />
     Resume
    </a>
   )}
  </>
 );
};

export default SentMessage;
