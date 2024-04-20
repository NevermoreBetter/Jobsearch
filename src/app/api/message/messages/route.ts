import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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
  const { body, resume, recieverId } = await req.json();

  const createMessage = await db.message.create({
   data: {
    body,
    resume,
    sender: { connect: { id: userData?.id } },
    reciever: { connect: { id: recieverId } },
   },
  });
  return NextResponse.json(createMessage, { status: 201 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" + error },
   { status: 500 }
  );
 }
}
