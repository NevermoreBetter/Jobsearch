import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
 params: {
  vacancyParams: string;
 };
}

export async function GET(req: Request, context: ContextProps) {
 try {
  const { params } = context;
  const vacancy = await db.vacancy.findFirst({
   where: { title: params.vacancyParams },
  });
  return NextResponse.json(vacancy, { status: 200 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" },
   { status: 500 }
  );
 }
}

export async function PATCH(req: Request, context: ContextProps) {
 try {
  const { params } = context;
  const body = await req.json();

  await db.vacancy.update({
   where: { id: params.vacancyParams },
   data: {
    title: body.title,
    description: body.description,
    locations: body.locations,
    type: body.type,
    salary: body.salary,
    experience: body.experience,
   },
  });
  return NextResponse.json(
   { message: "User updated successfully" },
   { status: 200 }
  );
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" },
   { status: 500 }
  );
 }
}
