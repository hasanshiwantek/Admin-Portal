"use client";


import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

export default function PrintLabels() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [checkIn, setCheckIn] = useState<any>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            const res = await axiosInstance.get(
                `/admin/child-checkins/${id}/labels`
            );

            setCheckIn(res.data.data);

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
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (

        <div className="bg-white min-h-screen p-10">

            {/* Parent Label */}

            <div className="border-2 border-black rounded-lg p-6 mb-10 page-break">

                <h1 className="text-3xl font-bold text-center">
                    THE WELL
                </h1>

                <h2 className="text-5xl font-bold text-center mt-5">
                    {checkIn.pickup_code}
                </h2>

                <div className="mt-8">

                    <p>
                        <strong>Parent:</strong>{" "}
                        {checkIn.parent.full_name}
                    </p>

                    <p className="mt-2">
                        <strong>Phone:</strong>{" "}
                        {checkIn.parent.phone}
                    </p>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold mb-3">
                        Children
                    </h3>

                    {checkIn.items.map(
                        (item: any) => (

                            <div
                                key={item.id}
                                className="flex justify-between border-b py-2"
                            >

                                <span>
                                    {item.child.full_name}
                                </span>

                                <span>
                                    {item.classroom.name}
                                </span>

                            </div>

                        )
                    )}

                </div>

            </div>

            {/* Child Labels */}

            {checkIn.items.map((item: any) => (

                <div
                    key={item.id}
                    className="border-2 border-black rounded-lg p-6 mb-8 page-break"
                >

                    <h1 className="text-2xl font-bold text-center">
                        THE WELL
                    </h1>

                    <div className="text-center mt-5">

                        <h2 className="text-4xl font-bold">
                            {checkIn.pickup_code}
                        </h2>

                    </div>

                    <div className="mt-8 space-y-3">

                        <p>

                            <strong>Name:</strong>{" "}

                            {item.child.full_name}

                        </p>

                        <p>

                            <strong>Age:</strong>{" "}

                            {item.child.age}

                        </p>

                        <p>

                            <strong>Classroom:</strong>{" "}

                            {item.classroom.name}

                        </p>

                        {item.child.allergies && (

                            <p className="text-red-600 font-semibold">

                                Allergies:{" "}

                                {item.child.allergies}

                            </p>

                        )}

                    </div>

                </div>

            ))}

        </div>

    );
}