import { db } from "@/lib/prisma";
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
