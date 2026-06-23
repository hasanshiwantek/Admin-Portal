"use client";
import Link from "next/link";

interface Props {
  events: any[];
  loading: boolean;
  error: any;

  currentPage: number;
  lastPage: number;

  setPage: (page: number) => void;
}

const EventTable = ({
  events,
  loading,
  error,
  currentPage,
  lastPage,
  setPage,
}: Props) => {
  if (loading) {
    return (
      <div className="p-5">
        Loading Events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Event Type
              </th>

              <th className="p-3 text-left">
                Location
              </th>

              <th className="p-3 text-left">
                Start Date
              </th>

              <th className="p-3 text-left">
                End Date
              </th>

              <th className="p-3 text-left">
                Registered
              </th>
              <th className="p-3">Actions</th>
             
            </tr>
          </thead>

          <tbody>
            {events?.map((event: any) => (
              <tr
                key={event.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-3">
                  {event.title}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs
                    ${
                      event.status === "COMPLETE"
                        ? "bg-green-100 text-green-700"
                        : event.status === "CANCELED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>

                <td className="p-3">
                  {event.event_type || "-"}
                </td>

                <td className="p-3">
                  {event.location || "-"}
                </td>

                <td className="p-3">
                  {new Date(
                    event.event_start
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {new Date(
                    event.event_end
                  ).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {event.registered_count}
                </td>
                <td className="p-3 text-center">
                <Link
                  href={`/events/event-registrations/${event.id}`}
                  className="px-4 py-2 rounded-md bg-[#008696] text-white !text-[13px]"
                >
                  View Registrations
                </Link>
              </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

export default EventTable;