"use server";

import { db } from "@/lib/prisma";

export const fetchUser = async (data: any) => {
 const user = await db.user.findUnique({ where: { id: data.authorId } });
 return user;
};

export const fetchVacancies = async (data: any) => {
 const vacancies = await db.vacancy.findMany({
  where: { authorId: data.id },
 });
 return vacancies;
};
