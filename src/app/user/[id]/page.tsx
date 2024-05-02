"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserDetail from "./_components/user-detail";
import { fetchUser, fetchVacancies } from "@/actions";

interface IUser {
 id: string;
 externalId: string | null;
 firstName: string | null;
 lastName: string | null;
 photo: string;
 email: string;
 createdAt: Date;
}

interface IVacancy {
 id: string;
 title: string;
 description: string;
 createdAt: Date;
 locations: string[];
 type: string;
 salary: string;
 experience: number;
 authorId: string;
}

const UserPage = () => {
 const router = usePathname();
 const userId = router.split("/").pop();
 const [user, setUser] = useState<IUser | null>(null);
 const [vacancies, setVacancies] = useState<IVacancy[] | null>(null);

 useEffect(() => {
  const fetchData = async () => {
   const userData = await fetchUser(userId);
   setUser(userData);
   const vacData = await fetchVacancies(userData);
   setVacancies(vacData);
  };

  fetchData();
 }, [userId]);

 return <UserDetail user={user} vacancies={vacancies} />;
};

export default UserPage;
