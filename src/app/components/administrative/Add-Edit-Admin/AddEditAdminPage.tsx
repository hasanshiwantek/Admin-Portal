import React from "react";
import AddAdminForm from "./AddAdminForm";
import AdminTable from "./AdminTable";

const AddEditAdminPage = () => {
  return (
    <div className="flex justify-start gap-5">
      <AdminTable />
      <AddAdminForm />
    </div>
  );
};

export default AddEditAdminPage;
