import { useState } from "react";
import AddEmployees from "./AddEmployees/addEmployee";
import "./page.scss";
import Admin from "./ListEmployees/admin";

function Page() {
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

  return (
    <>
      <Admin />
      <button className="btn" onClick={() => setAddEmployeeOpen(true)}>
        Add New Employees
      </button>
      {addEmployeeOpen && <AddEmployees />}
    </>
  );
}

export default Page;
