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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
 id: z.string().optional(),
 firstName: z
  .string()
  .min(5, {
   message: "First name must be at least 5 characters.",
  })
  .optional(),
 lastName: z
  .string()
  .min(5, {
   message: "Last name must be at least 5 characters.",
  })
  .optional(),
 email: z.string().email().optional(),
});

interface IProps {
 user?:
  | {
     id: string;
     firstName: string | null;
     lastName: string | null;
     email: string;
     photo: string;
    }
  | null
  | undefined;
}

export const ContactForm = ({ user }: IProps) => {
 const route = useRouter();
 const { mutate, isPending } = useMutation({
  mutationFn: async (editedUser: z.infer<typeof FormSchema>) => {
   return axios.patch(`/api/user/${user!.id}`, editedUser);
  },
  onSuccess: () => {
   toast({
    title: "Edited successfully!",
    description: "Your resume has been updated.",
   });
   route.refresh();
  },
 });

 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
   firstName: (user?.firstName ?? "") || undefined,
   lastName: (!!user ? user.lastName : "") || undefined,
   email: (!!user ? user.email : "") || undefined,
  },
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
       <FormLabel>First Name</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={(!!user ? user.firstName : "") ?? ""}
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
       <FormLabel>Last Name</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input defaultValue={(!!user ? user.lastName : "") ?? ""} {...field} />
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
       <FormLabel>Email</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input defaultValue={!!user ? user.email : ""} {...field} />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <Button disabled={isPending ? true : false}>
     {isPending ? "Editing..." : "Edit"}
    </Button>
   </form>
  </Form>
 );
};
