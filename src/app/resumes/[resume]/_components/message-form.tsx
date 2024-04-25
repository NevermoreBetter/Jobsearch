"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const MessageForm = ({ userData }) => {
 const { id } = userData;
 const [body, setBody] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   await axios.post("/api/message/messages", {
    body: body,
    recieverId: id,
   });

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
   <Button type="submit" disabled={isSubmitting} className="w-1/5 self-start">
    {isSubmitting ? "Sending..." : "Send Message"}
   </Button>
  </form>
 );
};
