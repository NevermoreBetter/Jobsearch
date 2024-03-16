import { UserButton } from "@clerk/nextjs";
import Home from "./_components/Home";

export default function HomePage() {
 return (
  <div className="h-screen">
   <UserButton />
   <Home />
  </div>
 );
}
