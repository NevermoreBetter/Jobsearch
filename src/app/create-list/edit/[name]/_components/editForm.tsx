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
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

const FormSchema = z.object({
 id: z.string().optional(),
 title: z.string().min(2, {
  message: "Position must be at least 2 characters.",
 }),
 description: z.string(),
 locations: z.string(),
 type: z.string(),
 salary: z.string(),
 experience: z.number(),
});

interface IProps {
 vacancy: {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  locations: string;
  type: string;
  salary: string;
  experience: number;
  authorId: string;
 };
}

const EditForm = ({ vacancy }: IProps) => {
 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
   id: vacancy.id,
   title: vacancy.title,
   description: vacancy.description,
   locations: vacancy.locations,
   type: vacancy.type,
   salary: vacancy.salary,
   experience: vacancy.experience,
  },
 });
 const { mutate } = useMutation({
  mutationFn: async (editedVacancy: z.infer<typeof FormSchema>) => {
   return axios.patch(`/api/vacancy/${vacancy!.id}`, editedVacancy);
  },
  onSuccess: () => {
   alert("success");
  },
 });

 async function onEdit(data: z.infer<typeof FormSchema>) {
  console.log(data);
  mutate(data);
 }

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onEdit)}
    className="w-[80%] mt-5 space-y-6"
   >
    <FormField
     control={form.control}
     name="title"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Title</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input placeholder="Your vacancy title" {...field} />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="salary"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Salary</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input type="number" placeholder="Monthly salary in USD" {...field} />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="experience"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Experience</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <>
          <Slider
           max={5}
           step={1}
           onValueChange={(value) => field.onChange(value[0])}
           defaultValue={!!vacancy ? [vacancy.experience] : [0]}
          />

          <div className="flex justify-between items-center w-full">
           <p>No exp</p>
           <p>1 year</p>
           <p>2 years</p>
           <p>3 years</p>
           <p>4 years</p>
           <p>5 years</p>
          </div>
         </>
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="locations"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Locations</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input placeholder="Office locations" {...field} />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="description"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Description</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Textarea
          placeholder="Write a brief description of your vacancy."
          rows={5}
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
     name="type"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Employment type</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input placeholder="Type" {...field} />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <Button type="submit">Edit</Button>
   </form>
  </Form>
 );
};

export default EditForm;
