"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserDetail from "./_components/user-detail";
import { fetchUser, fetchVacancies } from "@/actions";

const UserPage = () => {
 const router = usePathname();
 const userId = router.split("/").pop();
 const [user, setUser] = useState(null);
 const [vacancies, setVacancies] = useState(null);

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
