"use client";

import { useState } from "react";

import FamilySearch from "@/components/child-watch/CheckIn/FamilySearch";
import FamilyCard from "@/components/child-watch/CheckIn/FamilyCard";
import NewFamilyModal from "@/components/child-watch/CheckIn/NewFamilyModal";

export default function ChildCheckInPage() {

    const [family, setFamily] = useState(null);

    const [showModal, setShowModal] = useState(false);

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Child Check In
            </h1>

            <FamilySearch
                onSelect={setFamily}
                onCreate={() => setShowModal(true)}
            />

            {family && (

                <FamilyCard
                    family={family}
                />

            )}

            <NewFamilyModal
                open={showModal}
                onClose={() => setShowModal(false)}
            />

        </div>

    );

}