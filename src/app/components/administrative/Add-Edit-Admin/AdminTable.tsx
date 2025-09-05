"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { adminRoles, updateRole, removeRole } from "@/redux/slices/wellerSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { Admin } from "@/types/types";
import Spinner from "../../loader/Spinner";
import { refetchWellers } from "@/lib/wellerUtils";
const roles = [
  { role: "ROOT", id: 6 },
  { role: "Administrator", id: 5 },
  { role: "Volunteer", id: 1 },
  { role: "Child Watch", id: 2 },
  { role: "Prayer Group Leader", id: 3 },
  { role: "Bible Study Teacher", id: 4 },
];

const AdminTable = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminRoles());
  }, []);

  const admins = useAppSelector((state): Admin[] => state.wellers.admins) || [];
  const [localRoles, setLocalRoles] = useState<{ [key: number]: number }>({});

  const { loading, error } = useAppSelector((state: any) => state.wellers);
  const handleAccessChange = async (
    adminId: number,
    selectedRoleId: number
  ) => {
    // Optimistically update role locally
    setLocalRoles((prev) => ({ ...prev, [adminId]: selectedRoleId }));

    try {
      const resultAction = await dispatch(
        updateRole({
          roleId: adminId,
          data: { roleId: selectedRoleId },
        })
      );

      if (updateRole.fulfilled.match(resultAction)) {
        console.log("✅ Role updated successfully:", resultAction.payload);

        // Refetch after a short delay
        setTimeout(() => {
          refetchWellers(dispatch);
        }, 700);
      } else {
        console.error("❌ Failed to update role:", resultAction.payload);
      }
    } catch (err) {
      console.error("❌ Error updating role:", err);
    }
  };

  const handleRemove = async (id: number) => {
    const confirm = window.confirm("Delete selected role?");
    if (!confirm) {
      return;
    } else {
      try {
        const resultAction = await dispatch(
          removeRole({
            adminId: id,
          })
        );

        if (removeRole.fulfilled.match(resultAction)) {
          console.log("✅ Role updated successfully:", resultAction.payload);

          // Refetch after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.error("❌ Failed to update role:", resultAction.payload);
        }
      } catch (err) {
        console.error("❌ Error updating role:", err);
      }
    }
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                <Spinner />
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-red-500">
                ⚠️ {error || "Something went wrong."}
              </TableCell>
            </TableRow>
          ) : admins && admins.length > 0 ? (
            admins.map((admin: Admin) => (
              <TableRow key={admin.id}>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <Select
                    value={
                      localRoles[admin.id]?.toString() ||
                      admin.role?.id?.toString() ||
                      ""
                    }
                    onValueChange={(value) =>
                      handleAccessChange(admin.id, parseInt(value))
                    }
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-300 hover:text-red-600 hover:border-red-400 px-4 py-5 text-lg"
                    onClick={() => handleRemove(admin.id)}
                  >
                    <Trash2 className="!h-5 !w-5 mr-1" /> Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No administrators found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTable;
