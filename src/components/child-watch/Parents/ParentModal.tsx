"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    useAppDispatch,
} from "@/hooks/useReduxHooks";

import {
    createParent,
    updateParent,
    getParents,
} from "@/redux/slices/childWatchSlice";

interface Props {
    open: boolean;
    onClose: () => void;
    parent: any;
}

export default function ParentModal({
    open,
    onClose,
    parent,
}: Props) {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        address: "",

    });

    useEffect(() => {

        if (parent) {

            setForm({

                first_name: parent.first_name ?? "",

                last_name: parent.last_name ?? "",

                email: parent.email ?? "",

                phone: parent.phone ?? "",

                address: parent.address ?? "",

            });

        } else {

            setForm({

                first_name: "",

                last_name: "",

                email: "",

                phone: "",

                address: "",

            });

        }

    }, [parent]);

    if (!open) return null;

    const handleSubmit = async () => {

        if (!form.first_name.trim()) {

            toast.error("First name is required.");

            return;

        }

        if (!form.phone.trim()) {

            toast.error("Phone is required.");

            return;

        }

        setLoading(true);

        try {

            if (parent) {

                await dispatch(

                    updateParent({

                        id: parent.id,

                        data: form,

                    })

                ).unwrap();

                toast.success(
                    "Parent updated successfully."
                );

            } else {

                await dispatch(

                    createParent(form)

                ).unwrap();

                toast.success(
                    "Parent created successfully."
                );

            }

            dispatch(

                getParents({

                    page: 1,

                    search: "",

                })

            );

            onClose();

        } catch (err: any) {

            toast.error(err);

        }

        setLoading(false);

    };

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg w-[700px]">

                <div className="border-b p-5">

                    <h2 className="text-2xl font-semibold">

                        {parent
                            ? "Edit Parent"
                            : "Add Parent"}

                    </h2>

                </div>

                <div className="p-6">

                    <div className="grid grid-cols-2 gap-4">

                        <input

                            className="border rounded p-3"

                            placeholder="First Name"

                            value={form.first_name}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    first_name:
                                        e.target.value,

                                })

                            }

                        />

                        <input

                            className="border rounded p-3"

                            placeholder="Last Name"

                            value={form.last_name}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    last_name:
                                        e.target.value,

                                })

                            }

                        />

                        <input

                            className="border rounded p-3"

                            placeholder="Email"

                            value={form.email}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    email:
                                        e.target.value,

                                })

                            }

                        />

                        <input

                            className="border rounded p-3"

                            placeholder="Phone"

                            value={form.phone}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    phone:
                                        e.target.value,

                                })

                            }

                        />

                        <textarea

                            className="border rounded p-3 col-span-2"

                            rows={4}

                            placeholder="Address"

                            value={form.address}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    address:
                                        e.target.value,

                                })

                            }

                        />

                    </div>

                </div>

                <div className="border-t p-5 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="border px-5 py-2 rounded"

                    >

                        Cancel

                    </button>

                    <button

                        disabled={loading}

                        onClick={handleSubmit}

                        className="bg-[#008696] text-white px-5 py-2 rounded"

                    >

                        {loading
                            ? "Saving..."
                            : "Save"}

                    </button>

                </div>

            </div>

        </div>

    );

}