import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
 params: {
  userId: string;
 };
}

export async function PATCH(req: Request, context: ContextProps) {
 try {
  const { params } = context;
  const body = await req.json();

  await db.user.update({
   where: { id: params.userId },
   data: {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
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
