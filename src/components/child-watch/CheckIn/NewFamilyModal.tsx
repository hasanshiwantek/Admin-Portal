"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import {
    createParent,
    createChild,
} from "@/redux/slices/childWatchSlice";
import { toast } from "react-toastify";

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function NewFamilyModal({
    open,
    onClose,
}: Props) {
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [parent, setParent] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [children, setChildren] = useState([
        {
            first_name: "",
            last_name: "",
            dob: "",
            allergies: "",
            medical_notes: "",
        },
    ]);

    if (!open) return null;

    const addChild = () => {
        setChildren([
            ...children,
            {
                first_name: "",
                last_name: "",
                dob: "",
                allergies: "",
                medical_notes: "",
            },
        ]);
    };

    const removeChild = (index: number) => {
        setChildren(
            children.filter((_, i) => i !== index)
        );
    };

    const updateChild = (
        index: number,
        field: string,
        value: any
    ) => {
        const temp = [...children];

        temp[index] = {
            ...temp[index],
            [field]: value,
        };

        setChildren(temp);
    };

    const handleSave = async () => {

        setLoading(true);

        try {

            const parentRes: any = await dispatch(
                createParent(parent)
            ).unwrap();

            const parentId = parentRes.id;

            for (const child of children) {

                await dispatch(
                    createChild({
                        parent_profile_id: parentId,
                        ...child,
                    })
                ).unwrap();

            }

            toast.success(
                "Family created successfully."
            );

            onClose();

        } catch (err: any) {

            toast.error(err);

        }

        setLoading(false);

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-lg w-[900px] max-h-[90vh] overflow-auto">

                <div className="border-b p-5">

                    <h2 className="text-2xl font-semibold">
                        New Family
                    </h2>

                </div>

                <div className="p-6 space-y-6">

                    <div>

                        <h3 className="font-semibold mb-3">
                            Parent Information
                        </h3>

                        <div className="grid grid-cols-2 gap-4">

                            <input
                                className="border rounded p-3"
                                placeholder="First Name"
                                value={parent.first_name}
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        first_name:
                                            e.target.value,
                                    })
                                }
                            />

                            <input
                                className="border rounded p-3"
                                placeholder="Last Name"
                                value={parent.last_name}
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        last_name:
                                            e.target.value,
                                    })
                                }
                            />

                            <input
                                className="border rounded p-3"
                                placeholder="Email"
                                value={parent.email}
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        email:
                                            e.target.value,
                                    })
                                }
                            />

                            <input
                                className="border rounded p-3"
                                placeholder="Phone"
                                value={parent.phone}
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        phone:
                                            e.target.value,
                                    })
                                }
                            />

                            <textarea
                                className="border rounded p-3 col-span-2"
                                placeholder="Address"
                                value={parent.address}
                                onChange={(e) =>
                                    setParent({
                                        ...parent,
                                        address:
                                            e.target.value,
                                    })
                                }
                            />

                        </div>

                    </div>

                    <div>

                        <div className="flex justify-between items-center mb-4">

                            <h3 className="font-semibold">
                                Children
                            </h3>

                            <button
                                onClick={addChild}
                                className="bg-[#008696] text-white px-4 py-2 rounded"
                            >
                                + Add Child
                            </button>

                        </div>

                        {children.map(
                            (child, index) => (

                                <div
                                    key={index}
                                    className="border rounded-lg p-4 mb-4"
                                >

                                    <div className="grid grid-cols-2 gap-4">

                                        <input
                                            className="border rounded p-3"
                                            placeholder="First Name"
                                            value={
                                                child.first_name
                                            }
                                            onChange={(e) =>
                                                updateChild(
                                                    index,
                                                    "first_name",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                        <input
                                            className="border rounded p-3"
                                            placeholder="Last Name"
                                            value={
                                                child.last_name
                                            }
                                            onChange={(e) =>
                                                updateChild(
                                                    index,
                                                    "last_name",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                        <input
                                            type="date"
                                            className="border rounded p-3"
                                            value={
                                                child.dob
                                            }
                                            onChange={(e) =>
                                                updateChild(
                                                    index,
                                                    "dob",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                        <input
                                            className="border rounded p-3"
                                            placeholder="Allergies"
                                            value={
                                                child.allergies
                                            }
                                            onChange={(e) =>
                                                updateChild(
                                                    index,
                                                    "allergies",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                        <textarea
                                            className="border rounded p-3 col-span-2"
                                            placeholder="Medical Notes"
                                            value={
                                                child.medical_notes
                                            }
                                            onChange={(e) =>
                                                updateChild(
                                                    index,
                                                    "medical_notes",
                                                    e.target
                                                        .value
                                                )
                                            }
                                        />

                                    </div>

                                    {children.length >
                                        1 && (

                                        <button
                                            onClick={() =>
                                                removeChild(
                                                    index
                                                )
                                            }
                                            className="text-red-600 mt-3"
                                        >
                                            Remove Child
                                        </button>

                                    )}

                                </div>

                            )
                        )}

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
                        onClick={handleSave}
                        className="bg-green-600 text-white px-5 py-2 rounded"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Family"}
                    </button>

                </div>

            </div>

        </div>

    );
}