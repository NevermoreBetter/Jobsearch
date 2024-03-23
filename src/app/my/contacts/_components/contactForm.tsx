"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
 id: z.string().optional(),
 firstName: z.string().min(5, {
  message: "First name must be at least 5 characters.",
 }),
 lastName: z.string().min(5, {
  message: "Last name must be at least 5 characters.",
 }),
 email: z.string().email(),
 image: z.string(),
});

interface IProps {
 user?: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
 };
}

export const ContactForm = ({ user }: IProps) => {
 console.log(user);

 const { mutate } = useMutation({
  mutationFn: async (editedUser: z.infer<typeof FormSchema>) => {
   return axios.patch(`/api/${user!.id}`, editedUser);
  },
  onSuccess: () => {
   alert("success");
  },
 });

 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
 });

 async function onEdit(data: z.infer<typeof FormSchema>) {
  mutate(data);
 }

 async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
   await axios.post("/api/user", data);
   toast({
    title: "You submitted the following values:",
    description: (
     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
     </pre>
    ),
   });
  } catch (error) {
   console.log(error);
  }
 }

 return (
  <Form {...form}>
   <form
    onSubmit={!!user ? form.handleSubmit(onEdit) : form.handleSubmit(onSubmit)}
    className="w-[80%]  space-y-6"
   >
    <FormField
     control={form.control}
     name="firstName"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Position</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={!!user ? user.firstName : ""}
          placeholder="Your position title"
          {...field}
         />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="lastName"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Salary</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={!!user ? user.lastName : ""}
          placeholder="Your monthly salary in USD"
          {...field}
         />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="email"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Experience</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={!!user ? user.email : ""}
          placeholder="Your monthly salary in USD"
          {...field}
         />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="image"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Location</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={!!user ? user.image : ""}
          placeholder="Where do you live?"
          {...field}
         />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <Button>Edit</Button>
   </form>
  </Form>
 );
};
