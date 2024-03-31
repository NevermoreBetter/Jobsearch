import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
 params: {
  vacancyTitle: string;
 };
}

export async function GET(req: Request, context: ContextProps) {
 try {
  const { params } = context;
  const vacancy = await db.vacancy.findFirst({
   where: { title: params.vacancyTitle },
  });
  return NextResponse.json(vacancy, { status: 200 });
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong in api" },
   { status: 500 }
  );
 }
}
