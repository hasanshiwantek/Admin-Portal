"use client"
import React, { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { adminRoles } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Admin } from "@/types/types";

const roles = [
  "Root",
  "Admin",
  "Volunteer",
  "Administrator",
  "Child Watch",
  "Prayer Group Leader",
  "Bible Study Teacher",
];

const AdminTable = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminRoles())
  }, [])

  const admins = useAppSelector((state): Admin[] => state.wellers.admins) || [];

  const handleAccessChange = (id: number, newRole: string) => {
    // dispatch(updateAdminRole({ id, role: newRole }));
  };

  const handleRemove = (id: number) => {
    // dispatch(removeAdmin(id));
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-sm  w-[60%]">
      <h2 className="mb-4">Add Administrator</h2>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#F5F5F5]">
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Level of access</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin, index) => (
            <TableRow key={index}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <Select
                  value={admin.role.name}
                  onValueChange={(value) => handleAccessChange(admin.id, value)}
                >
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-300 hover:text-red-600 hover:border-red-400 px-4 py-5 text-lg"
                  onClick={() => handleRemove(index)}
                >
                  <Trash2 className="!h-5 !w-5 mr-1" /> Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
