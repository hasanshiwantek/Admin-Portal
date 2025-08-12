import React from "react";

type Props = {
  active?: number;
  inactive?: number;
};

const UsersBreakdown: React.FC<Props> = ({ active = 1830, inactive = 600 }) => {
  const total = active + inactive;
  const activePct = total ? Math.round((active / total) * 100) : 0;

  // Colors chosen to match the SS (teal + pink)
  const teal = "#008696";   // active
  const pink = "#f9a8d4";   // inactive

  return (
    <div className="w-[33%] rounded-md bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Users breakdown</h2>

      {/* Donut */}
      <div className="mt-4 flex justify-center">
        <div
          className="relative h-92 w-92 rounded-full"
          style={{
            background: `conic-gradient(${teal} 0 ${activePct}%, ${pink} ${activePct}% 100%)`,
          }}
        >
          {/* Hole */}
          <div className="absolute left-1/2 top-1/2 h-55 w-55 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>

          {/* Center text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center ">
            <div className="text-3xl font-extrabold text-gray-800">
              {total.toLocaleString()}
            </div>
            <div className="text-lg text-gray-400 -mt-1 ">Total users</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: teal }}
            />
            <span className="!text-black">Active Wellers</span>
          </div>
          <span className="!font-bold !text-black">
            {active.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: pink }}
            />
            <span className="!text-black">Inactive Wellers</span>
          </div>
          <span className="!font-bold !text-black">
            {inactive.toLocaleString()}
          </span>
        </div>
      </div>

      {/* CTA button */}
      <button
        type="button"
        className="!mt-6 w-full !rounded-full !p-6 !font-semibold btn-outline-primary"
      >
        View Wellers by day
      </button>
    </div>
  );
};

export default UsersBreakdown;
