"use client"
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const initialAdmins = [
  { name: "Lorri Warf", username: "jerry73@aol.com", access: "Root" },
  { name: "Jerry Helfer", username: "dennis416@gmail.com", access: "Root" },
  { name: "Rodger Struck", username: "c.a.glasser@outlook.com", access: "Root" },
  { name: "Ricky Smith", username: "eddie_lake@gmail.com", access: "Root" },
  { name: "Autumn Phillips", username: "r.g.rhodes@aol.com", access: "Root" },
  { name: "Paula Mora", username: "patricia651@outlook.com", access: "Root" },
  { name: "Frances Swann", username: "j.e.dukes@aol.com", access: "Root" },
  { name: "Daniel Hamilton", username: "iva838@outlook.com", access: "Root" },
  { name: "Kurt Bates", username: "k.p.allen@aol.com", access: "Root" },
  { name: "Mary Freund", username: "lorri73@gmail.com", access: "Root" },
];

const AdminTable = () => {
  const [admins, setAdmins] = useState(initialAdmins);

  const handleAccessChange = (index: number, newAccess: string) => {
    const updated = [...admins];
    updated[index].access = newAccess;
    setAdmins(updated);
  };

  const handleRemove = (index: number) => {
    const updated = admins.filter((_, i) => i !== index);
    setAdmins(updated);
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
              <TableCell>{admin.username}</TableCell>
              <TableCell>
                <Select
                  value={admin.access}
                  onValueChange={(value) => handleAccessChange(index, value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Access" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Root">Root</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
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
