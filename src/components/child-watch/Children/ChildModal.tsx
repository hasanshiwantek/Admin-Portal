"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    useAppDispatch,
} from "@/hooks/useReduxHooks";

import {
    createChild,
    updateChild,
    getChildren,
} from "@/redux/slices/childWatchSlice";

import axiosInstance from "@/lib/axiosInstance";

interface Props {
    open: boolean;
    onClose: () => void;
    child: any;
}

export default function ChildModal({
    open,
    onClose,
    child,
}: Props) {

    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [parents, setParents] = useState<any[]>([]);

    const [form, setForm] = useState({

        parent_profile_id: "",

        classroom_id: "",

        first_name: "",

        last_name: "",

        dob: "",

        allergies: "",

        medical_notes: "",

        is_active: true,

    });

    useEffect(() => {

        if (open) {

            loadDropdowns();

        }

    }, [open]);

    useEffect(() => {

        if (child) {

            setForm({

                parent_profile_id:
                    child.parent_profile_id,

                classroom_id:
                    child.classroom_id,

                first_name:
                    child.first_name,

                last_name:
                    child.last_name,

                dob:
                    child.dob,

                allergies:
                    child.allergies ?? "",

                medical_notes:
                    child.medical_notes ?? "",

                is_active:
                    child.is_active,

            });

        } else {

            setForm({

                parent_profile_id: "",

                classroom_id: "",

                first_name: "",

                last_name: "",

                dob: "",

                allergies: "",

                medical_notes: "",

                is_active: true,

            });

        }

    }, [child]);

    const loadDropdowns = async () => {

        try {

            const parentRes =
                await axiosInstance.get(
                    "/admin/parents?per_page=1000"
                );

            setParents(
                parentRes.data.data.data
            );

        } catch (err) {

            console.log(err);

        }

    };

    if (!open) return null;

    const handleSubmit = async () => {

        if (!form.parent_profile_id) {

            toast.error(
                "Please select parent."
            );

            return;

        }

        if (!form.first_name.trim()) {

            toast.error(
                "First name is required."
            );

            return;

        }

        if (!form.dob) {

            toast.error(
                "Date of birth is required."
            );

            return;

        }

        setLoading(true);

        try {

            if (child) {

                await dispatch(

                    updateChild({

                        id: child.id,

                        data: form,

                    })

                ).unwrap();

                toast.success(
                    "Child updated successfully."
                );

            } else {

                await dispatch(

                    createChild(form)

                ).unwrap();

                toast.success(
                    "Child created successfully."
                );

            }

            dispatch(

                getChildren({

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

            <div className="bg-white rounded-lg w-[800px]">

                <div className="border-b p-5">

                    <h2 className="text-2xl font-semibold">

                        {child
                            ? "Edit Child"
                            : "Add Child"}

                    </h2>

                </div>

                <div className="p-6">

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            className="border rounded p-3"
                            value={form.parent_profile_id}
                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    parent_profile_id:
                                        e.target.value,

                                })

                            }
                        >

                            <option value="">
                                Select Parent
                            </option>

                            {parents.map(parent=>(

                                <option
                                    key={parent.id}
                                    value={parent.id}
                                >

                                    {parent.full_name}

                                </option>

                            ))}

                        </select>

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
                            type="date"
                            className="border rounded p-3"
                            value={form.dob}
                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    dob:
                                        e.target.value,

                                })

                            }
                        />

                        <div className="flex items-center">

                            <input
                                type="checkbox"
                                checked={form.is_active}
                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        is_active:
                                            e.target.checked,

                                    })

                                }
                            />

                            <span className="ml-2">

                                Active

                            </span>

                        </div>

                        <textarea
                            className="border rounded p-3 col-span-2"
                            rows={3}
                            placeholder="Allergies"
                            value={form.allergies}
                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    allergies:
                                        e.target.value,

                                })

                            }
                        />

                        <textarea
                            className="border rounded p-3 col-span-2"
                            rows={4}
                            placeholder="Medical Notes"
                            value={form.medical_notes}
                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    medical_notes:
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