"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { TableRow, TableCell } from "@/components/ui/table";
import { DayTabs } from "@/components/ui/DayTabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Columns, Table2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
const headers = [
  "Name",
  "PG",
  "Last Attended",
  "Email",
  "Phone",
  "Address",
  "Class",
];

const rows = [
  {
    name: "Adrianne Branham",
    nameStyle: "link",
    nameHighlight: "none",
    pg: 24,
    lastAttended: "05-17-2017",
    email: "adrianne.f.branham@gmail.com",
    phone: "(813) 731-6077",
    address: "2205 Tail Feather Ct. Lutz, Fl 33549",
    klass: "Boundaries",
  },
  {
    name: "Ella Martinez",
    nameStyle: "normal",
    nameHighlight: "yellow",
    pg: 22,
    lastAttended: "01-15-2022",
    email: "ella.martinez@email.com",
    phone: "(212) 555-0167",
    address: "4321 Cedar Ave. New York, NY 10001",
    klass: "Research",
  },
  {
    name: "Marcus Holloway",
    nameStyle: "link",
    nameHighlight: "none",
    pg: 30,
    lastAttended: "11-02-2015",
    email: "marcus.holloway@example.com",
    phone: "(415) 555-0198",
    address: "1344 Oakwood Ave. San Francisco, CA 94107",
    klass: "Development",
  },
  {
    name: "Sofia Patel",
    nameStyle: "bold",
    nameHighlight: "none",
    pg: 28,
    lastAttended: "03-12-2020",
    email: "sofia.patel23@gmail.com",
    phone: "(619) 555-0141",
    address: "2504 Maple St. San Diego, CA 92101",
    klass: "Design",
  },
  {
    name: "Noah Kim",
    nameStyle: "normal",
    nameHighlight: "gray",
    pg: 27,
    lastAttended: "09-28-2019",
    email: "noah.kim@gmail.com",
    phone: "(503) 555-0189",
    address: "9876 Elm St. Portland, OR 97205",
    klass: "Product",
  },
  {
    name: "Liam Carter",
    nameStyle: "mutedItalic",
    nameHighlight: "none",
    pg: 35,
    lastAttended: "07-21-2018",
    email: "liam.carter@email.com",
    phone: "(303) 555-0123",
    address: "6789 Pine Dr. Denver, CO 80205",
    klass: "Marketing",
  },
  {
    name: "Chloe Nguyen",
    nameStyle: "link",
    nameHighlight: "none",
    pg: 26,
    lastAttended: "04-10-2021",
    email: "chloe.nguyen@example.com",
    phone: "(202) 555-0177",
    address: "1234 Birch Blvd. Washington, DC 20001",
    klass: "Analytics",
  },
  {
    name: "Ethan Chen",
    nameStyle: "normal",
    nameHighlight: "yellow",
    pg: 31,
    lastAttended: "10-29-2016",
    email: "ethan.chen@hotmail.com",
    phone: "(415) 555-0225",
    address: "4567 Spruce Ct. Seattle, WA 98101",
    klass: "Sales",
  },
  {
    name: "Mia Roberts",
    nameStyle: "link",
    nameHighlight: "none",
    pg: 29,
    lastAttended: "02-14-2023",
    email: "mia.roberts@mail.com",
    phone: "(312) 555-0111",
    address: "8910 Ash Ln. Chicago, IL 60601",
    klass: "Customer Support",
  },
];

export default function Page() {
  const [view, setView] = useState<"table" | "columns">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const totalPages = 10;
  return (
    <div className="p-6 space-y-8 shadow-sm rounded-md bg-white ">
      {/* HEADER */}
      <div className="flex justify-between items-center ">
        <div>
          <DayTabs
            onDayChange={(day) => console.log("Selected day:", day)}
            onPeriodChange={(period) => console.log("Selected period:", period)}
          />
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-5">
          <RadioGroup
            value={view}
            onValueChange={(v) => setView(v as "table" | "columns")}
            className="flex items-center gap-5"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="view-table" value="table" />
              <Label htmlFor="view-table" className="flex items-center gap-1">
                Table <Table2 className="h-5 w-5" />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="view-columns" value="columns" />
              <Label htmlFor="view-columns" className="flex items-center gap-1">
                Columns <Columns className="h-5 w-5" />
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <h2 className="">Wed-AM Wellers: 106 Active | 59 Dropped</h2>
      <div>
        <DataTable
          headers={headers}
          rows={rows}
          renderRow={(row, i) => (
            <TableRow key={i}>
              <TableCell>
                <div
                  className={`inline-block px-2 py-1 rounded-sm ${
                    row.nameHighlight === "yellow" ? "bg-yellow-100" : ""
                  }`}
                >
                  {row.name}
                </div>
              </TableCell>
              <TableCell>{row.pg}</TableCell>
              <TableCell>{row.lastAttended}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.klass}</TableCell>
            </TableRow>
          )}
        />
      </div>

      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
        />
      </div>
    </div>
  );
}
