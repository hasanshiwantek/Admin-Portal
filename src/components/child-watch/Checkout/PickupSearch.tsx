"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { searchPickupCode } from "@/redux/slices/childWatchSlice";
import { toast } from "react-toastify";

interface Props {
    onFound: (data: any) => void;
}

export default function PickupSearch({
    onFound,
}: Props) {

    const dispatch = useAppDispatch();

    const [pickupCode, setPickupCode] =
        useState("");

    const handleSearch = async () => {

        if (!pickupCode) {

            toast.error(
                "Enter pickup code."
            );

            return;

        }

        try {

            const res: any =
                await dispatch(
                    searchPickupCode(
                        pickupCode
                    )
                ).unwrap();

            onFound(res);

        } catch (err: any) {

            toast.error(err);

        }

    };

    return (

        <div className="bg-white rounded-lg shadow p-5">

            <div className="flex gap-3">

                <input
                    className="border rounded p-3 w-full"
                    placeholder="Pickup Code"
                    value={pickupCode}
                    onChange={(e)=>
                        setPickupCode(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={handleSearch}
                    className="bg-[#008696] text-white px-6 rounded"
                >
                    Search
                </button>

            </div>

        </div>

    );

}