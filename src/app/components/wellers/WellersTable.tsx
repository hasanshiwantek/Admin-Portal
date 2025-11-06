"use client";
import { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { TableRow, TableCell } from "@/components/ui/table";
import { DayTabs } from "@/components/ui/DayTabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Columns, Table2 } from "lucide-react";
import Pagination from "@/components/ui/pagination";
import Spinner from "../loader/Spinner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { seeMyGroupWellers } from "@/redux/slices/wellerSlice";
import { useAppDispatch } from "@/hooks/useReduxHooks";
const headers = [
  "Name",
  "Location",
  "Last Attended",
  "Email",
  "Phone",
  "Address",
  "Class",
];

export default function Page({
  wellersByDay,
  error,
  loading,
  selectedDay,
  setSelectedDay,
  selectedPeriod,
  setSelectedPeriod,
  currentPage,
  setCurrentPage,
  perPage,
  setPerPage,
}: {
  wellersByDay: any;
  error: any;
  loading: boolean;
  selectedDay: "tue" | "wed" | "thu";
  setSelectedDay: (day: "tue" | "wed" | "thu") => void;
  selectedPeriod: "am" | "pm";
  setSelectedPeriod: (period: "am" | "pm") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  perPage: string;
  setPerPage: (perPage: string) => void;
}) {
  const [view, setView] = useState<"table" | "columns">("table");
  const totalPages = wellersByDay?.pagination?.lastPage || 1;

  const rows = wellersByDay?.wellers;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const seeMyGroupHandler = async () => {
    try {
      const result = await dispatch(
        seeMyGroupWellers({
          day: selectedDay,
          time: selectedPeriod,
          perPage: perPage,
          page: currentPage,
        })
      );
      if (seeMyGroupWellers.fulfilled.match(result)) {
        console.log("✅", result?.payload);
      } else {
        console.log(result?.payload);
      }
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  };

  return (
    <div className="p-6 space-y-8 shadow-sm rounded-md bg-white ">
      {/* HEADER */}
      <div className="flex justify-between items-center ">
        <div className="flex justify-start gap-6 items-center ">
          <div>
            <DayTabs
              onDayChange={setSelectedDay}
              onPeriodChange={setSelectedPeriod}
              defaultDay={selectedDay}
              defaultPeriod={selectedPeriod}
            />
          </div>

          {/* CTA */}
          <div className="">
            <Button
              variant="outline"
              className="h-11 !rounded-full !p-7 btn-outline-primary !font-semibold"
              onClick={seeMyGroupHandler}
            >
              See my Group only
            </Button>
          </div>
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

      <h2>
        {`${selectedDay.toUpperCase()}-${selectedPeriod.toUpperCase()} Wellers: ${
          wellersByDay?.statistics?.totalActiveForSession
        } Active | ${wellersByDay?.statistics?.totalDroppedForSession} Dropped`}
      </h2>

      <div>
        {loading ? (
          // 🔄 Loading Spinner
          <div className="flex justify-center items-center h-40">
            <Spinner />
          </div>
        ) : error ? (
          // ❌ Error Message
          <div className="text-center text-red-500 font-medium py-10 text-xl">
            Error loading wellers. {error}
          </div>
        ) : rows?.length === 0 ? (
          // 📭 No Data Message
          <div className="text-center text-gray-500 font-medium py-10">
            No wellers found for this day/time.
          </div>
        ) : view === "table" ? (
          // ✅ Table View
          <DataTable
            headers={headers}
            rows={rows}
            renderRow={(row: any, i: number) => (
              <TableRow key={i}>
                <TableCell
                  className={cn(
                    row.hasNotes && "bg-yellow-100 rounded",
                    "flex items-center gap-2"
                  )}
                >
                  {/* Pink dot for Backup Leader */}
                  {row.isBackupLeader && (
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500" />
                  )}

                  {/* Blue dot for First Time (if not also backup leader) */}
                  {row.isFirstTime && !row.isBackupLeader && (
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-800" />
                  )}

                  {/* Weller Name */}
                  <span className={row.isLeader ? "font-bold" : ""}>
                    {row.name}
                  </span>
                </TableCell>

                <TableCell>{row.pgNumber || "N/A"} </TableCell>
                <TableCell>{row.lastAttended || "N/A"}</TableCell>
                <TableCell
                  onClick={() =>
                    router.push(`/info-leaders/quick-view/${row.id}`)
                  }
                  className="cursor-pointer hover:text-gray-500 hover:underline "
                >
                  {row.email || "N/A"}
                </TableCell>
                <TableCell>{row.phone || "N/A"}</TableCell>
                <TableCell>{row.address || "N/A"}</TableCell>
                <TableCell>{row.class || "N/A"}</TableCell>
              </TableRow>
            )}
          />
        ) : (
          // ✅ Columns View
          <div className="grid grid-flow-col auto-cols-[250px] gap-2 rounded-md overflow-x-auto ">
            {/* Name */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Name
              </div>

              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]",
                    row.hasNotes && "bg-yellow-100 rounded"
                  )}
                >
                  {row.isBackupLeader && (
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 mr-1" />
                  )}
                  {row.isFirstTime && !row.isBackupLeader && (
                    <span className="inline-block w-2 h-2 rounded-full bg-blue-800 mr-1" />
                  )}
                  <span className={cn(row.isLeader && "font-bold")}>
                    {row.name}
                  </span>
                </div>
              ))}
            </div>

            {/* PG */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Location
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]"
                >
                  {row.pg || "N/A"}
                </div>
              ))}
            </div>

            {/* Last Attended */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Last Attended
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]"
                >
                  {row.lastAttended || "N/A"}
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2 ">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Email
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  onClick={() =>
                    router.push(`/info-leaders/quick-view/${row.id}`)
                  }
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A] cursor-pointer hover:underline "
                >
                  {row.email || "N/A"}
                </div>
              ))}
            </div>

            {/* Phone */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Phone
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]"
                >
                  {row.phone || "N/A"}
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="flex flex-col border w-full rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5]">
                Address
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]"
                >
                  {row.address || "N/A"}
                </div>
              ))}
            </div>

            {/* Class */}
            <div className="flex flex-col w-full border rounded-md shadow-xs space-y-2">
              <div className="font-semibold p-2 border-b !bg-[#F5F5F5] w-full">
                Class
              </div>
              {rows.map((row: any, i: number) => (
                <div
                  key={i}
                  className="p-2 border-b text-[11.5px] font-medium text-[#3A3A3A]"
                >
                  {row.class || "N/A"}
                </div>
              ))}
            </div>
          </div>
        )}
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
