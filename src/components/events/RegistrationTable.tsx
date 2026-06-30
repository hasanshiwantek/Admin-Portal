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

  selectedRows: number[];
  setSelectedRows: any;

  onEdit: (registration: any) => void;
  onDelete: (registration: any) => void;
  onCheckIn: (registration: any) => void;
  onBulkCheckIn: () => void;
  onAddWalkIn: () => void;
  onBulkUndoCheckIn: () => void;
  onPrint: () => void;
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

  selectedRows,
  setSelectedRows,

  onEdit,
  onDelete,
  onCheckIn,
  onBulkCheckIn,
  onAddWalkIn,
  onBulkUndoCheckIn,
  onPrint,
}: Props) => {
  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(registrations.map((r: any) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter((item: number) => item !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const selectedRegistrations =
      registrations.filter((r: any) =>
          selectedRows.includes(r.id)
      );
  
      const allCheckedIn =
      selectedRegistrations.length > 0 &&
      selectedRegistrations.every(
          (r: any) => r.checked_in
      );
  
      const allPending =
      selectedRegistrations.length > 0 &&
      selectedRegistrations.every(
          (r: any) => !r.checked_in
      );

  return (
    <div className="bg-white rounded-lg shadow mt-5">

      {/* Top Actions */}
      <div className="flex justify-between items-center p-4 border-b">

        <div className="flex gap-3">

          <button
            onClick={onAddWalkIn}
            className="bg-[#008696] hover:bg-[#008696] text-white px-4 py-2 rounded"
          >
            + Add Walk-In
          </button>

          <button
            onClick={
                allCheckedIn
                    ? onBulkUndoCheckIn
                    : onBulkCheckIn
            }
            className={`px-4 py-2 rounded text-white ${
                allCheckedIn
                    ? "bg-orange-600"
                    : "bg-green-600"
            }`}
        >
            {allCheckedIn
                ? `Undo Check-In (${selectedRows.length})`
                : `Check In Selected (${selectedRows.length})`}
        </button>

        <button
          onClick={onPrint}
          className="bg-gray-700 text-white px-4 py-2 rounded"
      >
          Print Check-in List
      </button>

        </div>

      </div>

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
          className="border rounded px-3 py-2 w-72"
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
          <option value="">All Registrations</option>
          <option value="1">Checked In</option>
          <option value="0">Not Checked In</option>
        </select>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">

                <input
                  type="checkbox"
                  checked={
                    registrations.length > 0 &&
                    selectedRows.length === registrations.length
                  }
                  onChange={(e) =>
                    toggleAll(e.target.checked)
                  }
                />

              </th>

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

              <th className="p-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {registrations.length > 0 ? (

              registrations.map((registration: any) => (

                <tr
                  key={registration.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">

                    <input
                      type="checkbox"
                      checked={selectedRows.includes(
                        registration.id
                      )}
                      onChange={() =>
                        toggleRow(registration.id)
                      }
                    />

                  </td>

                  <td className="p-3 font-medium">
                    {registration.full_name}
                  </td>

                  <td className="p-3">
                    {registration.email}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                      ${
                        registration.registration_status ===
                        "REGISTERED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {registration.registration_status}
                    </span>

                  </td>

                  <td className="p-3">

                    <span
                      className={`px-2 py-1 rounded text-xs font-medium
                      ${
                        registration.payment_status ===
                        "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {registration.payment_status}
                    </span>

                  </td>

                  <td className="p-3">

                    <button
                    onClick={() =>
                      onCheckIn(registration)
                    }
                    className={`px-3 py-1 rounded text-s transition
                    ${
                      registration.checked_in
                        ? "bg-green-100 text-green-700 hover:bg-orange-100 hover:text-orange-700"
                        : "bg-yellow-100 text-yellow-700 hover:bg-green-100 hover:text-green-700"
                    }`}
                  >
                    {registration.checked_in
                      ? "Checked In"
                      : "Pending"}
                  </button>

                  </td>

                  <td className="p-3">
                    {registration.source}
                  </td>

                  <td className="p-3">
                    {new Date(
                      registration.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">

                    <div className="flex gap-2 justify-center">

                      <button
                        onClick={() =>
                          onEdit(registration)
                        }
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>

                      {registration.checked_in ? (

                      <button
                          onClick={() =>
                              onCheckIn(registration)
                          }
                          className="text-orange-600 hover:underline"
                      >
                          Undo Check-In
                      </button>

                      ) : (

                      <button
                          onClick={() =>
                              onCheckIn(registration)
                          }
                          className="text-green-600 hover:underline"
                      >
                          Check In
                      </button>

                      )}

                      <button
                        onClick={() =>
                          onDelete(registration)
                        }
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={9}
                  className="text-center p-6"
                >
                  No registrations found.
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
          onClick={() => setPage(currentPage - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {lastPage}
        </span>

        <button
          disabled={currentPage === lastPage}
          onClick={() => setPage(currentPage + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default RegistrationTable;