"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

export const MessageForm = ({ userData }) => {
 const { id } = userData;
 const [body, setBody] = useState("");
 const [resume, setResume] = useState<File>();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { edgestore } = useEdgeStore();

 const handleSubmit = async (e) => {
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
  <form onSubmit={handleSubmit}>
   <Textarea
    value={body}
    onChange={(e) => setBody(e.target.value)}
    placeholder="Enter your message"
   />
   <Input type="file" onChange={(e) => setResume(e.target.files?.[0])} />
   <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? "Sending..." : "Send Message"}
   </Button>
  </form>
 );
};
