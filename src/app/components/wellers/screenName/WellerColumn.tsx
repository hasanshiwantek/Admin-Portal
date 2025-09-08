"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";

export default function WellerColumn({
  data,
  pagination,
  onPageChange,
  perPageChange,
  totalWellers,
  session,
  pgNumber,
}: {
  data: any[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
  totalWellers: any;
  session: any;
  pgNumber: any;
  onPageChange: (val: number) => void;
  perPageChange: (val: string) => void;
}) {
  return (
    <div className="bg-white p-5 rounded-md shadow-sm">
      <h2 className="p-2 mb-4">
        {session || "N/A"} PG: {pgNumber || "N/A"} ({pagination?.total} Total)
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {["Last Attended", "Name", "Email", "Phone address", "Address"].map(
          (heading, i) => (
            <div
              key={i}
              className="rounded-md shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="bg-[#F5F5F5] px-4 py-2 text-lg font-semibold text-[#3A3A3A] border-b">
                {heading}
              </div>
              <ul className="space-y-3 overflow-y-auto max-h-[60vh]">
                {data?.map((weller, index) => (
                  <li
                    key={index}
                    className={cn(
                      "px-4 py-2 text-sm border-b last:border-b-0 whitespace-nowrap",
                      heading === "Name" && weller.hasNotes && "bg-yellow-100"
                    )}
                  >
                    {heading === "Last Attended" && (
                      <>{weller.lastAttended || "-"}</>
                    )}
                    {heading === "Name" && (
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          weller.hasNotes && "bg-yellow-100",
                          weller.isLeader ? "font-bold text-slate-800" : ""
                        )}
                      >
                        {/* Colored dot based on isNew or isFirstTime */}
                        {weller.isNew && (
                          <div className="inline-block h-3 w-3 rounded-full bg-blue-400" />
                        )}
                        {!weller.isNew && weller.isFirstTime && (
                          <div className="inline-block h-3 w-3 rounded-full bg-blue-800" />
                        )}

                        <div>{weller.name}</div>
                      </div>
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
        {pagination?.lastPage && pagination?.currentPage ? (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            onPageChange={onPageChange}
            perPage={String(pagination.perPage || "20")}
            onPerPageChange={perPageChange}
          />
        ) : null}
      </div>
    </div>
  );
}
