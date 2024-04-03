"use client";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
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

const formSchema = z.object({
 username: z.string().min(2, {
  message: "Username must be at least 2 characters.",
 }),
});

const AboutForm = () => {
 const { toast } = useToast();
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   username: "",
  },
 });

 const onSubmit = (data: z.infer<typeof formSchema>) => {
  toast({
   title: "Message sent",
   description: `${new Date().toLocaleDateString()}`,
  });
 };

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
     control={form.control}
     name="username"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Username</FormLabel>
       <FormControl>
        <Input placeholder="shadcn" {...field} />
       </FormControl>
       <FormDescription>This is your public display name.</FormDescription>
       <FormMessage />
      </FormItem>
     )}
    />
    <Button type="submit">Submit</Button>
   </form>
  </Form>
 );
};

export default AboutForm;
