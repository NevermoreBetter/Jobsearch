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

  const { title, content } = await req.json();

  const createResume = await db.resume.create({
   data: {
    title,
    content,
    authorId: user.id,
   },
  });
  return NextResponse.json(createResume, { status: 200 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong" },
   { status: 500 }
  );
 }
}
