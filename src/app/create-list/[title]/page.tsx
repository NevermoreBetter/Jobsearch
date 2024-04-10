import { db } from "@/lib/prisma";

interface IParams {
 params: {
  title: string;
 };
}

const VacanyDetailPage = async ({ params: { title } }: IParams) => {
 //! hz nado ili net

 const detail = await db.vacancy.findFirst({ where: { title: title } });
 console.log(detail);
 return <div>Vacancy Detail Page</div>;
};

export default VacanyDetailPage;
