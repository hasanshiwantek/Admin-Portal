"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { checkInChildren } from "@/redux/slices/childWatchSlice";
import { toast } from "react-toastify";

interface Props {
    family: any;
}

export default function FamilyCard({
    family,
}: Props) {
    const dispatch = useAppDispatch();

    const [selectedChildren, setSelectedChildren] = useState<number[]>([]);

    const [loading, setLoading] = useState(false);

    const toggleChild = (id: number) => {
        if (selectedChildren.includes(id)) {
            setSelectedChildren(
                selectedChildren.filter((item) => item !== id)
            );
        } else {
            setSelectedChildren([
                ...selectedChildren,
                id,
            ]);
        }
    };

    const handleCheckIn = async () => {

        if (selectedChildren.length === 0) {
            toast.error("Please select at least one child.");
            return;
        }

        setLoading(true);

        try {

            const res: any = await dispatch(
                checkInChildren({
                    parent_profile_id: family.id,
                    children: selectedChildren,
                })
            ).unwrap();

            toast.success("Children checked in successfully.");

            window.open(
                `/print/child-watch/${res.id}`,
                "_blank"
            );

            setSelectedChildren([]);

        } catch (err: any) {

            toast.error(err);

        }

        setLoading(false);

    };

    return (

        <div className="bg-white rounded-lg shadow">

            <div className="border-b p-5">

                <h2 className="text-xl font-semibold">
                    {family.full_name}
                </h2>

                <p>{family.phone}</p>

                <p>{family.email}</p>

            </div>

            <div className="p-5">

                {family.children.length > 0 ? (

                    family.children.map((child: any) => (

                        <div
                            key={child.id}
                            className="flex justify-between items-center border rounded p-4 mb-3"
                        >

                            <div>

                                <h3 className="font-semibold">
                                    {child.full_name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Age: {child.age}
                                </p>

                                <p className="text-sm">
                                    {child.classroom_name}
                                </p>

                                {child.allergies && (

                                    <p className="text-red-500 text-sm">
                                        Allergy: {child.allergies}
                                    </p>

                                )}

                            </div>

                            <input
                                type="checkbox"
                                checked={selectedChildren.includes(
                                    child.id
                                )}
                                onChange={() =>
                                    toggleChild(child.id)
                                }
                                className="h-5 w-5"
                            />

                        </div>

                    ))

                ) : (

                    <p>No children found.</p>

                )}

            </div>

            <div className="border-t p-5 flex justify-end">

                <button
                    onClick={handleCheckIn}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded disabled:opacity-50"
                >
                    {loading
                        ? "Checking In..."
                        : "Check In Selected"}
                </button>

            </div>

        </div>

    );
}