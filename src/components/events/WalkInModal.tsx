"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  loading: boolean;

  onClose: () => void;
  onSave: (data: any) => void;
}

const WalkInModal = ({
  open,
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
    source: "manual",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      notes: "",
      source: "manual",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg w-full max-w-xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Add Walk-In Registration
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            className="border rounded p-2"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2 col-span-2"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-2 col-span-2"
          />

          <textarea
            rows={4}
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className="border rounded p-2 col-span-2"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={handleClose}
            className="border rounded px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() => onSave(form)}
            className="bg-[#008696] text-white rounded px-5 py-2"
          >
            {loading ? "Saving..." : "Add Walk-In"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default WalkInModal;