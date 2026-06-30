"use client";

import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  registration: any;
  loading: boolean;

  onClose: () => void;
  onSave: (data: any) => void;
}

const RegistrationEditModal = ({
  open,
  registration,
  loading,
  onClose,
  onSave,
}: Props) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    notes: "",
    registration_status: "",
    payment_status: "",
  });

  useEffect(() => {
    if (registration) {
      setForm({
        first_name: registration.first_name || "",
        last_name: registration.last_name || "",
        email: registration.email || "",
        phone: registration.phone || "",
        notes: registration.notes || "",
        registration_status:
          registration.registration_status || "",
        payment_status:
          registration.payment_status || "",
      });
    }
  }, [registration]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg w-full max-w-xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Edit Registration
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded p-2"
          />

          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="border rounded p-2"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded p-2 col-span-2"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border rounded p-2 col-span-2"
          />

          <select
            name="registration_status"
            value={form.registration_status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="REGISTERED">
              REGISTERED
            </option>

            <option value="PENDING">
              PENDING
            </option>

            <option value="CANCELED">
              CANCELED
            </option>

            <option value="EXPIRED">
              EXPIRED
            </option>
          </select>

          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
            className="border rounded p-2"
          >
            <option value="PAID">
              PAID
            </option>

            <option value="PENDING">
              PENDING
            </option>

            <option value="FAILED">
              FAILED
            </option>

            <option value="REFUNDED">
              REFUNDED
            </option>

            <option value="CANCELLED">
              CANCELLED
            </option>

            <option value="CHARGED_BACK">
              CHARGED_BACK
            </option>
          </select>

          <textarea
            rows={4}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="border rounded p-2 col-span-2"
            placeholder="Notes"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border rounded px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onSave(form)}
            className="bg-[#008696] text-white rounded px-5 py-2"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default RegistrationEditModal;