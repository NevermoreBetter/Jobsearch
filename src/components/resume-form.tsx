"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormShema = z.object({
 title: z.string().min(1).max(100),
 description: z.string().min(1).max(500),
});

export function ResumeForm() {
 const form = useForm<z.infer<typeof FormShema>>({
  resolver: zodResolver(FormShema),
  defaultValues: {
   title: "",
   description: "",
  },
 });

 const onSubmit = (data: z.infer<typeof FormShema>) => {
  toast({ title: "Your resume has been saved" });
 };
}
