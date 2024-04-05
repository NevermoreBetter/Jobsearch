import ResumesList from "./_components/resumes-list";
import ResumesSidebar from "./_components/resumes-sidebar";

const ResumesPage = () => {
 return (
  <div className="flex">
   <ResumesSidebar />
   <ResumesList />
  </div>
 );
};

export default ResumesPage;
