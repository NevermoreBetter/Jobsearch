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
 position: z.string().min(5, {
  message: "Position must be at least 5 characters.",
 }),
 experience: z.number(),
 salary: z.string(),
 location: z.string(),
 description: z
  .string()
  .min(10, {
   message: "Description must be at least 10 characters.",
  })
  .max(250, {
   message: "Description must be at most 250 characters.",
  }),
 type: z.string(),
});

interface IProps {
 resume?: {
  id: string;
  position: string;
  experience: number;
  salary: string;
  location: string;
  description: string;
  type: string;
 };
}

export const ProfileForm = ({ resume }: IProps) => {
 console.log(resume);

 const { mutate } = useMutation({
  mutationFn: async (editedPost: {
   id: string;
   position: string;
   experience: number;
   salary: string;
   location: string;
   description: string;
   type: string;
  }) => {
   return axios.patch(`/api/${resume!.id}`, editedPost);
  },
  onSuccess: () => {
   alert("success");
  },
 });

 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
   position: "",
  },
 });

 async function onEdit(data: z.infer<typeof FormSchema>) {
  mutate(data);
 }

 async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
   await axios.post("/api/resumes", data);
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
    onSubmit={
     !!resume ? form.handleSubmit(onEdit) : form.handleSubmit(onSubmit)
    }
    className="w-2/3 space-y-6"
   >
    <FormField
     control={form.control}
     name="position"
     render={({ field }) => (
      <FormItem
       defaultValue={!!resume ? resume.position : ""}
       className="flex justify-between items-center"
      >
       <FormLabel>Position</FormLabel>
       <FormControl>
        <Input placeholder="This is your public display name." {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="salary"
     render={({ field }) => (
      <FormItem className="flex justify-between items-center">
       <FormLabel>Salary</FormLabel>
       <FormControl>
        <Input
         defaultValue={!!resume ? resume.salary : ""}
         placeholder="Your monthly salary in USD"
         {...field}
        />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="experience"
     render={({ field }) => (
      <FormItem className="flex justify-between items-center">
       <FormLabel>Experience</FormLabel>
       <FormControl>
        <div className="flex flex-col w-[70%]">
         <Slider
          defaultValue={!!resume ? [resume.experience] : [0]}
          max={5}
          step={1}
          onValueChange={(value) => field.onChange(value[0])}
         />

         <div className="flex justify-between items-center w-full">
          <p>No exp</p>
          <p>1 year</p>
          <p>2 years</p>
          <p>3 years</p>
          <p>4 years</p>
          <p>5 years</p>
         </div>
        </div>
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="location"
     render={({ field }) => (
      <FormItem className="flex justify-between items-center">
       <FormLabel>Location</FormLabel>
       <FormControl>
        <Input
         defaultValue={!!resume ? resume.location : ""}
         placeholder="Where do you live?"
         {...field}
        />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="description"
     render={({ field }) => (
      <FormItem className="flex justify-between items-center">
       <FormLabel>Description</FormLabel>
       <FormControl>
        <Input
         defaultValue={!!resume ? resume.description : ""}
         placeholder="Write a brief description of yourself."
         {...field}
        />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="type"
     render={({ field }) => (
      <FormItem className="flex justify-between items-center">
       <FormLabel>Employment type</FormLabel>
       <FormControl>
        <Input
         defaultValue={!!resume ? resume.type : ""}
         placeholder="Type"
         {...field}
        />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    {!!resume ? <Button>Edit</Button> : <Button type="submit">Submit</Button>}
   </form>
  </Form>
 );
};