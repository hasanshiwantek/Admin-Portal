"use client";

import React from "react";

const columns = [
  [
    "Dennis Callis",
    "Kurt Bates",
    "Lorri Warf",
    "James Hall",
    "Kenneth Allen",
    "Bradley Lawlor",
    "Kathy Pacheco",
    "Jerry Helfer",
    "Stephanie Nicol",
    "Patricia Sanders",
  ],
  [
    "Chris Glasser",
    "Autumn Phillips",
    "Mary Freund",
    "Alex Buckmaster",
    "Katie Sims",
    "Ricky Smith",
    "Eddie Lake",
    "David Elson",
    "Judith Rodriguez",
    "Joshua Jones",
  ],
  [
    "Rhonda Rhodes",
    "Stephanie Sharkey",
    "Kimberly Mastrangelo",
    "Rodger Struck",
    "Iva Ryan",
    "Daniel Hamilton",
    "Corina McCoy",
    "Frances Swann",
    "Paula Mora",
    "John Dukes",
  ],
];

export default function BackupGreeters() {
  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold mb-4">TUE PM Backup Greeters</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((names, colIdx) => (
          <div
            key={colIdx}
            className="border rounded-md overflow-hidden shadow-sm"
          >
            {/* Column Header */}
            <div className="bg-[#F5F5F5] px-4 py-4 text-lg font-semibold text-slate-700 border-b">
              Name
            </div>

            {/* Names */}
            <ul className="space-y-3">
              {names.map((name, i) => (
                <li
                  key={i}
                  className="px-4 py-2 text-sm border-b last:border-b-0"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
