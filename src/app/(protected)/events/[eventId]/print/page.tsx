"use client";

import { use, useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface Registration {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  checked_in: boolean;
}

interface EventData {
  title: string;
  event_start: string;
}

export default function PrintPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);

  const [loading, setLoading] = useState(true);

  const [event, setEvent] = useState<EventData | null>(null);

  const [registrations, setRegistrations] = useState<
    Registration[]
  >([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      /**
       * Create a print endpoint that returns
       * ALL registrations (no pagination)
       */

      const res = await axiosInstance.get(
        `/admin/events/${eventId}/registrations/print`
      );

      setEvent(res.data.event);

      setRegistrations(res.data.registrations);

      setLoading(false);

      setTimeout(() => {
        window.print();
      }, 300);
    } catch (err) {
      console.error(err);

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-10">

      <h1 className="text-3xl font-bold">
        {event?.title}
      </h1>

      <p className="text-gray-600 mb-6">
        {event?.event_start &&
          new Date(event.event_start).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}
      </p>

      <table className="w-full border-collapse">

        <thead>

          <tr>

            <th className="border p-3 w-16">
              ✓
            </th>

            <th className="border p-3 text-left">
              Name
            </th>

            <th className="border p-3 text-left">
              Email
            </th>

            <th className="border p-3 text-left">
              Phone
            </th>

            <th className="border p-3 text-center">
              Checked In
            </th>

            <th className="border p-3 text-center">
              Signature
            </th>

          </tr>

        </thead>

        <tbody>

          {registrations.map((registration) => (

            <tr key={registration.id}>

              <td className="border h-12"></td>

              <td className="border p-3">
                {registration.full_name}
              </td>

              <td className="border p-3">
                {registration.email}
              </td>

              <td className="border p-3">
                {registration.phone}
              </td>

              <td className="border p-3 text-center">

                {registration.checked_in
                  ? "✔"
                  : ""}

              </td>

              <td className="border h-12"></td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}