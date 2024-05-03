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
import { Textarea } from "@/components/ui/textarea";
import {
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
 Select as SingleSelect,
} from "@/components/ui/select";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const locationOptions = [
 { value: "Kyiv", label: "Kyiv" },
 { value: "Lviv", label: "Lviv" },
 { value: "Mykolaiv", label: "Mykolaiv" },
 { value: "Kharkiv", label: "Kharkiv" },
 { value: "Dnipro", label: "Dnipro" },
 { value: "Zaporizhzhya", label: "Zaporizhzhya" },
 { value: "Odessa", label: "Odessa" },
 { value: "Poltava", label: "Poltava" },
 { value: "Kherson", label: "Kherson" },
 { value: "Ternopil", label: "Ternopil" },
];

const FormSchema = z.object({
 id: z.string().optional(),
 position: z.string().min(2, {
  message: "Position must be at least 2 characters.",
 }),
 experience: z.number(),
 salary: z.string(),
 location: z.string(),
 description: z.string().min(10, {
  message: "Description must be at least 10 characters.",
 }),
 type: z.string().array(),
});

interface IProps {
 resume:
  | {
     id: string;
     position: string;
     experience: number;
     salary: string;
     location: string;
     description: string;
     type: string[];
    }
  | null
  | undefined;
}

export const ProfileForm = ({ resume }: IProps) => {
 const route = useRouter();
 const [isSubmitting, setIsSubmitting] = useState(false);
 const { mutate, isPending } = useMutation({
  mutationFn: async (editedPost: z.infer<typeof FormSchema>) => {
   return axios.patch(`/api/resume/${resume!.id}`, editedPost);
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
   position: !!resume ? resume.position : "",
   experience: !!resume ? resume.experience : 0,
   salary: !!resume ? resume.salary : "",
   location: !!resume ? resume.location : "",
   description: !!resume ? resume.description : "",
   type: !!resume ? resume.type : [],
  },
 });

 async function onEdit(data: z.infer<typeof FormSchema>) {
  mutate(data);
 }

 async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
   setIsSubmitting(true);

   await axios.post("/api/resume/resumes", data);
   toast({
    title: "Submitted successfully!",
    description: "Your resume has been submitted.",
   });
  } catch (error) {
   console.log(error);
  } finally {
   setIsSubmitting(false);
  }
 }

 const defaultValues = resume?.type.map((option) => ({
  value: option,
  label: option,
 }));

 return (
  <Form {...form}>
   <form
    onSubmit={
     !!resume ? form.handleSubmit(onEdit) : form.handleSubmit(onSubmit)
    }
    className="w-[80%]  space-y-6"
   >
    <FormField
     control={form.control}
     name="position"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Position</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          defaultValue={!!resume ? resume.position : ""}
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
     name="salary"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Salary</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Input
          type="number"
          defaultValue={!!resume ? resume.salary : ""}
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
     name="experience"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Experience</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <>
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
         </>
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="location"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Your city</FormLabel>
       <SingleSelect onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
         <SelectTrigger className="w-[70%]">
          <SelectValue placeholder="Select city" />
         </SelectTrigger>
        </FormControl>
        <SelectContent>
         {locationOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
           {option.label}
          </SelectItem>
         ))}
        </SelectContent>
       </SingleSelect>
       <FormMessage />
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
          defaultValue={!!resume ? resume.description : ""}
          rows={5}
          placeholder="Write a brief description of yourself."
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
         <Select
          className="text-black "
          defaultValue={defaultValues}
          options={[
           { value: "On Site", label: "On Site" },
           { value: "Remote", label: "Remote" },
           { value: "Hybrid", label: "Hybrid" },
          ]}
          styles={{
           control: (base, state) => ({
            ...base,
            backgroundColor: "222.2 84% 4.9%",
            border: "1px solid hsl(200 9% 23%)",
            outline: state.isFocused
             ? "2px solid hsl(212.7 26.8% 83.9%)"
             : undefined,
           }),
           option: (base) => ({ ...base, backgroundColor: "222.2 84% 4.9%" }),
          }}
          isMulti
          onChange={(selectedOptions) => {
           field.onChange(selectedOptions.map((option) => option.value));
           console.log(selectedOptions.map((option) => option.value));
          }}
         />
        </FormControl>
        <FormMessage />
       </div>
      </FormItem>
     )}
    />
    {!!resume ? (
     <Button disabled={isPending ? true : false}>
      {isPending ? "Editing..." : "Edit"}
     </Button>
    ) : (
     <Button type="submit" disabled={isSubmitting ? true : false}>
      {isSubmitting ? "Submitting..." : "Submit"}
     </Button>
    )}
   </form>
  </Form>
 );
};
