"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/pagination";
import Spinner from "../../loader/Spinner";

export default function WellerColumn({
  wellers,
  loading,
  error,
  currentClass,
  day,
  period,
  currentPage,
  perPage,
  totalPages,
  onPageChange,
  onPerPageChange,
}: {
  wellers: any[];
  loading: boolean;
  error: any;
  currentClass: string;
  day: string;
  period: string;
  currentPage: number;
  perPage: string;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (value: string) => void;
}) {
  const getWellerClass = (weller: any) => {
    const classes: string[] = [];

    if (weller.role_id === 1) {
      classes.push("bg-slate-100"); // GRAY BG – Teacher
    }

    if (weller.notes && weller.notes.trim() !== "") {
      classes.push("bg-yellow-100"); // YELLOW BG – Has Notes
    }

    return classes.join(" ");
  };

  const getWellerDotClass = (weller: any) => {
    if (!weller.last_attended_at) {
      return "bg-blue-800"; // DARK BLUE – First Time Weller
    }

    if (weller.is_new_member) {
      return "bg-blue-400"; // BLUE – New This Session
    }

    return ""; // No dot
  };

  return (
    <div className="bg-white p-5 rounded-md shadow-sm min-h-[300px] relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center font-medium text-xl py-4">
          {error || "Something went wrong."}
        </div>
      )}
      {!loading && !error && (
        <>
          <h2 className="p-2 mb-4 capitalize">
            ({wellers?.length ?? 0} Total) {day}_{period}: {currentClass}
          </h2>

          {!wellers || wellers.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
              No data available
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
                {[
                  "Last Attended",
                  "Name",
                  "Email",
                  "Phone address",
                  "Address",
                ].map((heading, i) => (
                  <div
                    key={i}
                    className="rounded-md shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div className="bg-[#F5F5F5] px-4 py-2 text-lg font-semibold text-[#3A3A3A] border-b">
                      {heading}
                    </div>
                    <ul className="space-y-2 overflow-y-auto p-2 max-h-[350px]">
                      {wellers.map((weller, index) => (
                        <li
                          key={index}
                          className={cn(
                            "px-2 py-1 rounded text-sm",
                            getWellerClass(weller)
                          )}
                        >
                          {heading === "Last Attended" && (
                            <>
                              {weller.last_attended_at
                                ? new Date(
                                    weller.last_attended_at
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : "—"}
                            </>
                          )}
                          {heading === "Name" && (
                            <div className="flex items-center gap-2">
                              {getWellerDotClass(weller) && (
                                <span
                                  className={`inline-block h-2.5 w-2.5 rounded-full ${getWellerDotClass(
                                    weller
                                  )}`}
                                />
                              )}
                              <span>
                                {weller.first_name} {weller.last_name}
                              </span>
                            </div>
                          )}

                          {heading === "Email" && <>{weller.email}</>}
                          {heading === "Phone address" && <>{weller.phone}</>}
                          {heading === "Address" && (
                            <>{weller.address_street}</>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-end my-5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  perPage={perPage}
                  onPerPageChange={onPerPageChange}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
