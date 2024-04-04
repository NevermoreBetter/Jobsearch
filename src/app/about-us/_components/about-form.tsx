"use client";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
 username: z.string().min(2, {
  message: "Username must be at least 2 characters.",
 }),
 message: z
  .string()
  .min(10, {
   message: "Message must be at least 10 characters.",
  })
  .max(500, {
   message: "Message must be at most 500 characters.",
  }),
});

const AboutForm = () => {
 const { toast } = useToast();
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   username: "",
   message: "",
  },
 });

 const onSubmit = (data: z.infer<typeof formSchema>) => {
  toast({
   title: "Message sent",
   description: `${new Date().toLocaleDateString()}`,
  });
 };

 return (
  <>
   <h2 className="text-4xl font-bold text-center mb-10">
    Do you have any questions?
   </h2>
   <Form {...form}>
    <form
     id="form"
     onSubmit={form.handleSubmit(onSubmit)}
     className="space-y-8 mb-20 w-1/2 flex flex-col items-center justify-center mx-auto"
    >
     <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
       <FormItem className="flex items-start justify-between">
        <FormLabel>Your Name</FormLabel>
        <div className="flex flex-col w-2/3">
         <FormControl>
          <Input placeholder="Name" className="" {...field} />
         </FormControl>
         <FormMessage />
        </div>
       </FormItem>
      )}
     />
     <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
       <FormItem className="flex items-start justify-between">
        <FormLabel className="flex">Your Message</FormLabel>
        <div className="flex flex-col w-2/3">
         <FormControl>
          <Textarea placeholder="Message" className="" {...field} />
         </FormControl>
         <FormMessage />
        </div>
       </FormItem>
      )}
     />
     <Button type="submit">Submit</Button>
    </form>
   </Form>
  </>
 );
};

export default AboutForm;
