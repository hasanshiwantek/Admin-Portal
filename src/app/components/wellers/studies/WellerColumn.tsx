// app/components/WellerColumn.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";
type Weller = {
  lastAttended: string;
  name: string;
  nameStyle?: "link" | "bold" | "normal";
  nameHighlight?: "yellow" | "gray";
  email: string;
  phone: string;
  address: string;
};

const WELLERS: Weller[] = [
  {
    lastAttended: "05-17-2017",
    name: "Adrianne Branham",
    nameStyle: "link",
    email: "lorri73@gmail.com",
    phone: "(301) 580-7410",
    address: "2205 Tail Feather Ct. Lutz, Fl 33549",
  },
  {
    lastAttended: "05-17-2017",
    name: "Deborah Acree",
    nameStyle: "link",
    email: "k.r.mastrangelo@outlook.com",
    phone: "(785) 712-6532",
    address: "3522 West Fork Street, Missoula, MT 59801",
  },
  {
    lastAttended: "05-17-2017",
    name: "Felix Ashford",
    nameStyle: "bold",
    email: "stephanienicol@outlook.com",
    phone: "(813) 752-5611",
    address: "417 Bicetown Road, New York, NY 10018",
  },
  {
    lastAttended: "05-17-2017",
    name: "Cynthia Collins",
    nameStyle: "normal",
    nameHighlight: "gray",
    email: "dennis416@gmail.com",
    phone: "(814) 413-9191",
    address: "1406 Mattson Street, Astoria, OR 97103",
  },
  {
    lastAttended: "05-17-2017",
    name: "Jasper Knight",
    email: "r.g.rhodes@aol.com",
    phone: "(904) 335-2403",
    address: "1949 Linda Street, West Brunswick Twp, PA 19549",
  },
  {
    lastAttended: "05-17-2017",
    name: "Natalie Vargas",
    email: "katie63@aol.com",
    phone: "(215) 424-7763",
    address: "591 Joanne Lane, Wilmington, MA 01887",
  },
  {
    lastAttended: "05-17-2017",
    name: "Oliver Rios",
    email: "Daniel_hamilton@aol.com",
    phone: "(978) 444-4055",
    address: "2323 Dancing Dove Lane, Long Island City, NY 11101",
  },
  {
    lastAttended: "05-17-2017",
    name: "Samantha Newell",
    nameHighlight: "yellow",
    email: "m.k.freund@aol.com",
    phone: "(830) 556-6651",
    address: "3024 Joes Road, Albany, NY 12207",
  },
  {
    lastAttended: "05-17-2017",
    name: "Victor Tran",
    email: "rodger913@aol.com",
    phone: "(267) 739-6240",
    address: "2614 Sweetwood Drive, Arvada, CO 80002",
  },
  {
    lastAttended: "05-17-2017",
    name: "Wendy Martinez",
    email: "k_pacheco@gmail.com",
    phone: "(907) 248-8330",
    address: "4130 Butternut Lane, Alton, IL 62002",
  },
];

export default function WellerColumn() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState("20");
  const totalPages = 10;
  return (
    <div className="bg-white p-5 rounded-md shadow-sm">
      <h2 className="p-2 mb-4">(16 Total) WAM: Disunity</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {["Last Attended", "Name", "Email", "Phone address", "Address"].map(
          (heading, i) => (
            <div
              key={i}
              className="rounded-md shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-[#F5F5F5]  px-4 py-2 text-lg font-semibold text-[#3A3A3A]  border-b">
                {heading}
              </div>
              <ul className="space-y-3 overflow-y-auto">
                {WELLERS.map((weller, index) => (
                  <li
                    key={index}
                    className={cn(
                      "px-4 py-2 text-sm border-b last:border-b-0 whitespace-nowrap",
                      heading === "Name" &&
                        weller.nameHighlight === "yellow" &&
                        "bg-yellow-100",
                      heading === "Name" &&
                        weller.nameHighlight === "gray" &&
                        "bg-slate-100"
                    )}
                  >
                    {/* Render based on column */}
                    {heading === "Last Attended" && <>{weller.lastAttended}</>}
                    {heading === "Name" && (
                      <>
                        {weller.nameStyle === "link" ? (
                          <a className="text-blue-600 hover:underline">
                            {weller.name}
                          </a>
                        ) : weller.nameStyle === "bold" ? (
                          <span className="font-bold text-slate-800">
                            {weller.name}
                          </span>
                        ) : (
                          <span>{weller.name}</span>
                        )}
                      </>
                    )}
                    {heading === "Email" && <>{weller.email}</>}
                    {heading === "Phone address" && <>{weller.phone}</>}
                    {heading === "Address" && <>{weller.address}</>}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
      <div className="flex justify-end my-5">
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
