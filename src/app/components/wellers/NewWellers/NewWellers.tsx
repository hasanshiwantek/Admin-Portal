// app/NewWellers.tsx
"use client"
import React, { useState } from "react";
import DataColumn from "@/components/ui/DataColumn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const newWellersData = [
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "X",
    tam: "X",
    tpm: "X",
    name: "Kurt Bates",
    email: "lorri13@gmail.com",
    phone: "(301) 580-7410",
    invitedBy: "Katie Sims",
    pg: { tupm: 5, wam: 8, tam: 0, tpm: 5 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "X",
    tam: "",
    tpm: "X",
    name: "David Elson",
    email: "k.r.mastrangelo@outlook.com",
    phone: "(785) 712-6532",
    invitedBy: "Bradley Lawlor",
    pg: { tupm: 0, wam: 2, tam: 0, tpm: 2 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "",
    tam: "",
    tpm: "X",
    name: "Stephanie Nicol",
    email: "stephanienicol@outlook.com",
    phone: "(813) 752-5811",
    invitedBy: "Judith Rodriguez",
    pg: { tupm: 5, wam: 0, tam: 0, tpm: 5 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "",
    tam: "X",
    tpm: "",
    name: "Dennis Callis",
    email: "dennis416@gmail.com",
    phone: "(814) 403-9181",
    invitedBy: "Patricia Sanders",
    pg: { tupm: 0, wam: 0, tam: 0, tpm: 0 },
  },
  {
    date: "05-17-2017",
    tupm: "",
    wam: "",
    tam: "X",
    tpm: "",
    name: "Judith Rodriguez",
    email: "r.g.rhodes@aol.com",
    phone: "(904) 335-2403",
    invitedBy: "Kimberly James",
    pg: { tupm: 6, wam: 0, tam: 0, tpm: 5 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "X",
    tam: "X",
    tpm: "X",
    name: "Kurt Bates",
    email: "lorri13@gmail.com",
    phone: "(301) 580-7410",
    invitedBy: "Katie Sims",
    pg: { tupm: 5, wam: 8, tam: 0, tpm: 5 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "X",
    tam: "",
    tpm: "X",
    name: "David Elson",
    email: "k.r.mastrangelo@outlook.com",
    phone: "(785) 712-6532",
    invitedBy: "Bradley Lawlor",
    pg: { tupm: 0, wam: 2, tam: 0, tpm: 2 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "",
    tam: "",
    tpm: "X",
    name: "Stephanie Nicol",
    email: "stephanienicol@outlook.com",
    phone: "(813) 752-5811",
    invitedBy: "Judith Rodriguez",
    pg: { tupm: 5, wam: 0, tam: 0, tpm: 5 },
  },
  {
    date: "05-17-2017",
    tupm: "X",
    wam: "",
    tam: "X",
    tpm: "",
    name: "Dennis Callis",
    email: "dennis416@gmail.com",
    phone: "(814) 403-9181",
    invitedBy: "Patricia Sanders",
    pg: { tupm: 0, wam: 0, tam: 0, tpm: 0 },
  },
  {
    date: "05-17-2017",
    tupm: "",
    wam: "",
    tam: "X",
    tpm: "",
    name: "Judith Rodriguez",
    email: "r.g.rhodes@aol.com",
    phone: "(904) 335-2403",
    invitedBy: "Kimberly James",
    pg: { tupm: 6, wam: 0, tam: 0, tpm: 5 },
  },
];

const NewWellers = () => {
  const tabOptions = ["New", "Guests", "Returnees", "Dropped"];
  const [activeTab, setActiveTab] = useState("New");
  return (
    <div className="flex flex-col gap-5">
      {/* Tabs */}
      <div className="flex gap-4 p-5">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={` transition-all duration-200 ${
              activeTab === tab
                ? "btn-primary "
                : "btn-outline-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5 space-y-7 bg-white rounded-md shadow-sm">
        {/* Date Range */}
        <div className="flex items-center gap-3 text-sm">
          <Label>From</Label>
          <Input type="date" defaultValue="2025-02-09" className="" />
          <Label>TO</Label>
          <Input type="date" defaultValue="2025-10-08" className="" />
          <button className="btn-outline-primary">Select</button>
        </div>
        {/* Summary Header */}
        <div>
          <h2>New Wellers – (40 Total)</h2>
          <p>Showing Dates: 02/09/2025 to 02/15/2017</p>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-white rounded-md shadow-sm">
        {/* Total Breakdown */}
        <h2>
          Total New Wellers: TUPM: 2 | WAM: 6 | TAM: 16 | TPM: 15 | 40 Total
        </h2>

        {/* Scrollable Columns */}
        <div className="flex overflow-x-auto gap-3">
          <DataColumn
            title="Start date"
            items={newWellersData.map((d) => d.date)}
          />
          <DataColumn title="TUPM" items={newWellersData.map((d) => d.tupm)} />
          <DataColumn title="WAM" items={newWellersData.map((d) => d.wam)} />
          <DataColumn title="TAM" items={newWellersData.map((d) => d.tam)} />
          <DataColumn title="TPM" items={newWellersData.map((d) => d.tpm)} />
          <DataColumn title="Name" items={newWellersData.map((d) => d.name)} />
          <DataColumn
            title="Email"
            items={newWellersData.map((d) => d.email)}
          />
          <DataColumn
            title="Phone address"
            items={newWellersData.map((d) => d.phone)}
          />
          <DataColumn
            title="Invited by"
            items={newWellersData.map((d) => d.invitedBy)}
          />
          <DataColumn
            title="PG TUPM"
            items={newWellersData.map((d) => d.pg.tupm.toString())}
          />
          <DataColumn
            title="PG WAM"
            items={newWellersData.map((d) => d.pg.wam.toString())}
          />
          <DataColumn
            title="PG TAM"
            items={newWellersData.map((d) => d.pg.tam.toString())}
          />
          <DataColumn
            title="PG TPM"
            items={newWellersData.map((d) => d.pg.tpm.toString())}
          />
        </div>
      </div>
    </div>
  );
};

export default NewWellers;
