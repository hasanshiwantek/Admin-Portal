"use client";

interface Props {
  registrations: any[];
  loading: boolean;
  error: any;

  currentPage: number;
  lastPage: number;

  setPage: (page: number) => void;

  filters: any;
  setFilters: any;
}

const RegistrationTable = ({
  registrations,
  loading,
  error,
  currentPage,
  lastPage,
  setPage,
  filters,
  setFilters,
}: Props) => {
  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-5 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow mt-5">
      {/* Filters */}
      <div className="flex gap-4 p-4 border-b">
        <input
          type="text"
          placeholder="Search name or email"
          value={filters.search}
          onChange={(e) => {
            setPage(1);

            setFilters({
                ...filters,
                search: e.target.value,
            });
            }}
          className="border rounded px-3 py-2"
        />

        <select
          value={filters.checked_in}
          onChange={(e) => {
            setPage(1);

            setFilters({
                ...filters,
                checked_in: e.target.value,
            });
            }}
          className="border rounded px-3 py-2"
        >
          <option value="">
            All Registrations
          </option>

          <option value="1">
            Checked In
          </option>

          <option value="0">
            Not Checked In
          </option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                Registration Status
              </th>

              <th className="p-3 text-left">
                Payment Status
              </th>

              <th className="p-3 text-left">
                Checked In
              </th>

              <th className="p-3 text-left">
                Source
              </th>

              <th className="p-3 text-left">
                Registered At
              </th>
            </tr>
          </thead>

          <tbody>
            {registrations?.length > 0 ? (
              registrations.map(
                (registration: any) => (
                  <tr
                    key={registration.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {registration.full_name}
                    </td>

                    <td className="p-3">
                      {registration.email}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          registration.registration_status ===
                          "REGISTERED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          registration.registration_status
                        }
                      </span>
                    </td>

                    <td className="p-3">
                      {
                        registration.payment_status
                      }
                    </td>

                    <td className="p-3">
                      {registration.checked_in
                        ? "Yes"
                        : "No"}
                    </td>

                    <td className="p-3">
                      {registration.source}
                    </td>

                    <td className="p-3">
                      {new Date(
                        registration.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center p-4"
                >
                  No registrations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center p-4 border-t">
        <button
          disabled={currentPage === 1}
          onClick={() =>
            setPage(currentPage - 1)
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() =>
            setPage(currentPage + 1)
          }
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RegistrationTable;