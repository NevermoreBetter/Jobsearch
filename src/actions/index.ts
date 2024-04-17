"use server";

import { db } from "@/lib/prisma";

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
