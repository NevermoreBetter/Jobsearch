"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

interface IUser {
 userData:
  | {
     id: string;
     externalId: string | null;
     firstName: string | null;
     lastName: string | null;
     photo: string;
     email: string;
     createdAt: Date;
    }
  | undefined
  | null;
}

export const MessageForm = ({ userData }: IUser) => {
 const [body, setBody] = useState("");
 const [resume, setResume] = useState<File>();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { edgestore } = useEdgeStore();
 if (!userData) {
  return <div>No user data available</div>;
 }
 const { id } = userData;

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   if (resume) {
    const res = await edgestore.publicFiles.upload({
     file: resume,
    });

    await axios.post("/api/message/messages", {
     body: body,
     resume: res?.url,
     recieverId: id,
    });
   } else {
    await axios.post("/api/message/messages", {
     body: body,
     recieverId: id,
    });
   }

   toast({
    title: "Message sent successfully!",
    description: "Your message has been sent.",
   });
  } catch (error) {
   console.log(error);
   toast({
    title: "Error sending message",
    description: "An error occurred while sending your message.",
   });
  } finally {
   setIsSubmitting(false);
  }
 };

 return (
  <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
   <Textarea
    value={body}
    onChange={(e) => setBody(e.target.value)}
    placeholder="Enter your message"
   />
   <Input type="file" onChange={(e) => setResume(e.target.files?.[0])} />
   <Button type="submit" disabled={isSubmitting} className="w-1/5 self-start">
    {isSubmitting ? "Sending..." : "Send Message"}
   </Button>
  </form>
 );
};
