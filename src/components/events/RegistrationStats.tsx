"use client";

interface Props {
  stats: any;
}

const RegistrationStats = ({
  stats,
}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-5 rounded shadow">
        <p>Total Registrations</p>

        <h2 className="text-3xl font-bold">
          {stats?.total_registrations ||
            0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded shadow">
        <p>Registered</p>

        <h2 className="text-3xl font-bold text-green-600">
          {stats?.registered_count ||
            0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded shadow">
        <p>Cancelled</p>

        <h2 className="text-3xl font-bold text-red-600">
          {stats?.cancelled_count ||
            0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded shadow">
        <p>Checked In</p>

        <h2 className="text-3xl font-bold text-blue-600">
          {stats?.checked_in_count ||
            0}
        </h2>
      </div>
    </div>
  );
};

export default RegistrationStats;