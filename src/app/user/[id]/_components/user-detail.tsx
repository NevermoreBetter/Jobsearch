import { Mail } from "lucide-react";
import Image from "next/image";
import UsersVacancy from "./users-vacancy";

const UserDetail = ({ user, vacancies }) => {
 if (!user || !vacancies) {
  return (
   <div className="flex justify-center items-center h-[250px] w-full text-white">
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="1em"
     height="1em"
     viewBox="0 0 24 24"
    >
     <path
      fill="currentColor"
      d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
     >
      <animateTransform
       attributeName="transform"
       dur="0.75s"
       repeatCount="indefinite"
       type="rotate"
       values="0 12 12;360 12 12"
      ></animateTransform>
     </path>
    </svg>
   </div>
  );
 }
 return (
  <div className="flex justify-around">
   <div className="flex flex-col gap-2">
    <div className="flex justify-start items-center w-fit gap-2 text-white">
     <Image
      src={user.photo}
      alt={user.name}
      width={30}
      height={30}
      className="rounded-full"
     />
     <h2>{user.firstName}</h2>
     <h2>{user.lastName}</h2>
    </div>
    <p>Active vacancies: {vacancies.length}</p>
    <a
     href={`mailto:${user.email}`}
     className="flex justify-start items-center gap-2 text-white "
    >
     <Mail />
     Contact user
    </a>
    <p className="text-slate-400 text-sm">
     Created: {user.createdAt.toLocaleDateString()}
    </p>
   </div>
   <div>
    {vacancies.map((vacancy) => (
     <UsersVacancy key={vacancy.id} vacancy={vacancy} />
    ))}
   </div>
  </div>
 );
};

export default UserDetail;
