import JobItem from "./job-item";

const JobsList = () => {
 // const [itemOffset, setItemOffset] = useState(0);

 // const endOffset = itemOffset + itemsPerPage;
 // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
 // const currentItems = items.slice(itemOffset, endOffset);
 // const pageCount = Math.ceil(items.length / itemsPerPage);

 // const handlePageClick = (event) => {
 //  const newOffset = (event.selected * itemsPerPage) % items.length;
 //  console.log(
 //   `User requested page number ${event.selected}, which is offset ${newOffset}`
 //  );
 //  setItemOffset(newOffset);
 // };

 return (
  <div className="flex-grow-[4] flex flex-col gap-4 py-4">
   <JobItem />
   <JobItem />
   <JobItem />
   <JobItem />
   <JobItem />
  </div>
 );
};

export default JobsList;
