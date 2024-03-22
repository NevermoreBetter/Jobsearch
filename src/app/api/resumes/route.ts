import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
 try {
  const resumes = await db.resume.findMany();
  return NextResponse.json(resumes, { status: 200 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong" },
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
  const { type, position, experience, salary, location, description } =
   await req.json();

  const createResume = await db.resume.create({
   data: {
    type,
    position,
    experience,
    salary,
    location,
    description,
    authorId: userData!.externalId,
   },
  });
  return NextResponse.json(createResume, { status: 201 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" + error.message },
   { status: 500 }
  );
 }
}
