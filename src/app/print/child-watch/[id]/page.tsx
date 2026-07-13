"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axiosInstance";
import "./print.css";

interface LabelData {
    parent: {
        full_name: string;
        phone: string;
        email?: string;
    };
    items: {
        id: number;
        pickup_number: number;
        child: {
            full_name: string;
            age: number;
            allergies: string | null;
            medical_notes: string | null;
        };
        classroom: {
            name: string;
        };
    }[];
}

export default function PrintLabels() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [checkIn, setCheckIn] =
        useState<LabelData | null>(null);

    useEffect(() => {

        loadLabels();

    }, []);

    useEffect(() => {

        if (!loading && checkIn) {

            const timer = setTimeout(() => {

                window.print();

            }, 500);

            return () => clearTimeout(timer);

        }

    }, [loading, checkIn]);

    const loadLabels = async () => {

        try {

            const res = await axiosInstance.get(

                `/admin/child-checkins/${id}/labels`

            );

            setCheckIn(res.data.data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="loading-screen">

                Loading labels...

            </div>

        );

    }

    if (!checkIn) {

        return (

            <div className="loading-screen">

                Unable to load labels.

            </div>

        );

    }

    return (

        <div className="sheet">

            {checkIn.items.map((item) => (

                <div
                    key={item.id}
                    className="label-pair"
                >

                    {/* ===========================
                        Parent Claim Ticket
                    ============================ */}

                    <div className="label parent-label">

                        <div className="label-header">

                            <Image
                                src="/_next/static/media/portal-logo.2b8b538a.png"
                                alt="The Well"
                                width={300}
                                height={200}
                            />

                            {/* <div className="d-block">

                                <h2>

                                    THE WELL

                                </h2>

                                <p>

                                    Parent Claim Ticket

                                </p>

                            </div> */}

                        </div>

                        <div className="pickup-number">

                            {item.pickup_number}

                        </div>

                        <div className="divider"></div>

                        <div className="field">

                            <span className="field-title">

                                Parent

                            </span>

                            <span>

                                {checkIn.parent.full_name}

                            </span>

                        </div>

                        <div className="field">

                            <span className="field-title">

                                Phone

                            </span>

                            <span>

                                {checkIn.parent.phone}

                            </span>

                        </div>

                        <div className="field">

                            <span className="field-title">

                                Child

                            </span>

                            <span>

                                {item.child.full_name}

                            </span>

                        </div>

                        <div className="field">

                            <span className="field-title">

                                Classroom

                            </span>

                            <span>

                                {item.classroom.name}

                            </span>

                        </div>

                        <div className="footer-text">

                            Present this ticket when
                            picking up your child.

                        </div>

                    </div>
                                        {/* ===========================
                        Child Sticker
                    ============================ */}

                    <div className="label child-label">

                        <div className="label-header">

                            <Image
                                src="/_next/static/media/portal-logo.2b8b538a.png"
                                alt="The Well"
                                width={300}
                                height={200}
                            />

                            {/* <div>

                                <h2>

                                    THE WELL

                                </h2>

                                <p>

                                    Child Sticker

                                </p>

                            </div> */}

                        </div>

                        <div className="pickup-number">

                            {item.pickup_number}

                        </div>

                        <div className="divider"></div>

                        <div className="field">

                            <span className="field-title">

                                Child

                            </span>

                            <span>

                                {item.child.full_name}

                            </span>

                        </div>

                        <div className="two-column">

                            <div>

                                <span className="field-title">

                                    Age

                                </span>

                                <span>

                                    {item.child.age}

                                </span>

                            </div>

                            <div>

                                <span className="field-title">

                                    Classroom

                                </span>

                                <span>

                                    {item.classroom.name}

                                </span>

                            </div>

                        </div>

                        <div className="field">

                            <span className="field-title">

                                Allergies

                            </span>

                            <span>

                                {item.child.allergies
                                    ? item.child.allergies
                                    : "None"}

                            </span>

                        </div>

                        <div className="field">

                            <span className="field-title">

                                Medical Notes

                            </span>

                            <span>

                                {item.child.medical_notes
                                    ? item.child.medical_notes
                                    : "None"}

                            </span>

                        </div>

                        <div className="footer-text">

                            Place this sticker on the
                            child's back.

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}