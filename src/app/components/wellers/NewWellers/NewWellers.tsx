"use client";
import React, { useState, useEffect } from "react";
import DataColumn from "@/components/ui/DataColumn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import {
  getNewWellers,
  getGuestWellers,
  getReturneeWellers,
  getDroppedWellers,
} from "@/redux/slices/groupSlice";
import Spinner from "../../loader/Spinner";

const NewWellers = () => {
  const tabOptions = ["New", "Guests", "Returnees", "Dropped"];
  const [activeTab, setActiveTab] = useState("New");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dispatch = useAppDispatch();
  const { newWellers, loading, error } = useAppSelector((state: any) => state.groups);
  const data = newWellers?.data || [];

  const fetchWellersByTab = async (tab: string) => {
    if (!fromDate || !toDate) return;

    const payload = { from: fromDate, to: toDate };

    switch (tab) {
      case "New":
        await dispatch(getNewWellers(payload));
        break;
      case "Guests":
        await dispatch(getGuestWellers(payload));
        break;
      case "Returnees":
        await dispatch(getReturneeWellers(payload));
        break;
      case "Dropped":
        await dispatch(getDroppedWellers(payload));
        break;
      default:
        break;
    }
  };

  // 🚀 On tab change or date range update
  useEffect(() => {
    fetchWellersByTab(activeTab);
  }, [activeTab, fromDate, toDate]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex gap-4 p-5">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`transition-all duration-200 ${
              activeTab === tab ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter + Summary */}
      <div className="p-5 space-y-7 bg-white rounded-md shadow-sm">
        <div className="flex items-center gap-3 text-sm">
          <Label>From</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <Label>To</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div>
          <h2>{activeTab} Wellers – ({data.length} Total)</h2>
          {fromDate && toDate && (
            <p>
              Showing Dates: {formatDate(fromDate)} to {formatDate(toDate)}
            </p>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="p-6 space-y-6 bg-white rounded-md shadow-sm">
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-center !text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          <div className="flex overflow-x-auto gap-3">
            <DataColumn
              title="Start Date"
              items={data.map((d: any) => formatDate(d.startDate))}
            />
            <DataColumn
              title="TUPM"
              items={data.map((d: any) => (d.attendances.includes("tue_pm") ? "X" : ""))}
            />
            <DataColumn
              title="WAM"
              items={data.map((d: any) => (d.attendances.includes("wed_am") ? "X" : ""))}
            />
            <DataColumn
              title="TAM"
              items={data.map((d: any) => (d.attendances.includes("thu_am") ? "X" : ""))}
            />
            <DataColumn
              title="TPM"
              items={data.map((d: any) => (d.attendances.includes("thu_pm") ? "X" : ""))}
            />
            <DataColumn title="Name" items={data.map((d: any) => `${d.firstName} ${d.lastName}`)} />
            <DataColumn title="Email" items={data.map((d: any) => d.email || "—")} />
            <DataColumn title="Phone" items={data.map((d: any) => d.phone || "—")} />
            <DataColumn title="Invited By" items={data.map((d: any) => d.invitedBy || "—")} />
            <DataColumn
              title="PG TUPM"
              items={data.map(
                (d: any) =>
                  d.prayerGroups.find((pg: any) => pg.session === "tue_pm")?.pg_number || "—"
              )}
            />
            <DataColumn
              title="PG WAM"
              items={data.map(
                (d: any) =>
                  d.prayerGroups.find((pg: any) => pg.session === "wed_am")?.pg_number || "—"
              )}
            />
            <DataColumn
              title="PG TAM"
              items={data.map(
                (d: any) =>
                  d.prayerGroups.find((pg: any) => pg.session === "thu_am")?.pg_number || "—"
              )}
            />
            <DataColumn
              title="PG TPM"
              items={data.map(
                (d: any) =>
                  d.prayerGroups.find((pg: any) => pg.session === "thu_pm")?.pg_number || "—"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewWellers;
