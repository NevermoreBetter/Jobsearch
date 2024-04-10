import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const vacancy = await db.vacancy.findMany();
  return NextResponse.json(vacancy, { status: 200 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" },
   { status: 500 }
  );
 }
}

export async function POST(req: Request) {
 const user = await currentUser();

 try {
  if (!user) {
   return NextResponse.json(
    { message: "You must be logged in" },
    { status: 401 }
   );
  }

  const userData = await db.user.findFirst({ where: { externalId: user.id } });
  console.log(userData?.id, user.id);
  const { type, title, experience, salary, locations, description } =
   await req.json();

  const createVacancy = await db.vacancy.create({
   data: {
    type,
    title,
    experience,
    salary,
    locations,
    description,
    authorId: userData!.id,
   },
  });
  return NextResponse.json(createVacancy, { status: 201 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" + error },
   { status: 500 }
  );
 }
}
