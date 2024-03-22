import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
 params: {
  resumeId: string;
 };
}

export async function PATCH(req: Request, context: ContextProps) {
 try {
  const { params } = context;
  const body = await req.json();

  await db.resume.update({
   where: { id: params.resumeId },
   data: {
    type: body.type,
    position: body.position,
    experience: body.experience,
    salary: body.salary,
    location: body.location,
    description: body.description,
   },
  });
  return NextResponse.json(
   { message: "Resume updated successfully" },
   { status: 200 }
  );
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" },
   { status: 500 }
  );
 }
}
