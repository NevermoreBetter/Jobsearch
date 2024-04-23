"use server";

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export const fetchUser = async (data: any) => {
 try {
  const user = await db.user.findUnique({ where: { id: data } });
  return user;
 } catch (error) {
  console.error("Error fetching user:", error);
  throw error;
 }
};

export const fetchAllVacancies = async () => await db.vacancy.findMany();

export const fetchVacancies = async (data: any) => {
 const vacancies = await db.vacancy.findMany({
  where: { authorId: data.id },
  orderBy: { createdAt: "desc" },
 });
 return vacancies;
};

export const deleteVacancy = async (data: any) => {
 const vacancy = await db.vacancy.delete({ where: { id: data } });
 return vacancy;
};

const getUserById = async () => {
 const user = await currentUser();
 const userById = await db.user.findUnique({
  where: { externalId: user?.id },
 });
 return userById;
};

export const getMessages = async () => {
 const user = await getUserById();
 console.log(user);
 const messages = await db.message.findMany({
  where: { recieverId: user?.id },
  orderBy: { createdAt: "desc" },
 });
 return messages;
};

export const getResumeById = async (data: any) => {
 const resume = await db.resume.findUnique({
  where: { authorId: data },
 });
 return resume;
};
