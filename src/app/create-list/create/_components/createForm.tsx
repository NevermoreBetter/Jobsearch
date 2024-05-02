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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import {
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
 Select as SingleSelect,
} from "@/components/ui/select";

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
 // Add more locations as needed
];

const FormSchema = z.object({
 id: z.string().optional(),
 title: z.string().min(2, {
  message: "Position must be at least 2 characters.",
 }),
 description: z.string(),
 locations: z.string().array(),
 type: z.string(),
 salary: z.string(),
 experience: z.number(),
});

interface IProps {
 resume: {
  id: string;
  position: string;
  experience: number;
  salary: string;
  location: string[];
  description: string;
  type: string;
 } | null;
}

export const CreateForm = () => {
 const router = useRouter();
 const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
   experience: 0,
  },
 });

 async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
   await axios.post("/api/vacancy/vacancies", data);
   toast({
    title: "You submitted the following values:",
    description: (
     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      <code className="text-white">{JSON.stringify(data, null, 2)}</code>
     </pre>
    ),
   });
   router.push("/create-list");
   router.refresh();
  } catch (error) {
   console.log(error);
  }
 }

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="w-[80%] space-y-6">
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
           min={0}
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
     name="locations"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Locations</FormLabel>
       <div className="flex flex-col w-[70%] justify-between">
        <FormControl>
         <Select
          className="text-black "
          options={locationOptions}
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
          onChange={(selectedOptions) =>
           field.onChange(selectedOptions.map((option) => option.value))
          }
         />
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
      <FormItem className="">
       <FormLabel>Employment type</FormLabel>
       <SingleSelect onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
         <SelectTrigger className="w-[70%]">
          <SelectValue placeholder="Select type of work" />
         </SelectTrigger>
        </FormControl>
        <SelectContent>
         <SelectItem value="Remote">Remote</SelectItem>
         <SelectItem value="On Site">On Site</SelectItem>
         <SelectItem value="Hybrid">Hybrid</SelectItem>
        </SelectContent>
       </SingleSelect>
       <FormMessage />
      </FormItem>
     )}
    />
    <Button type="submit">Submit</Button>
   </form>
  </Form>
 );
};
