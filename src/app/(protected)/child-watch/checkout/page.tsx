"use client";

import { useState } from "react";

import PickupSearch from "@/components/child-watch/Checkout/PickupSearch";
import CheckoutCard from "@/components/child-watch/Checkout/CheckoutCard";

export default function CheckoutPage() {

    const [checkIn, setCheckIn] = useState<any>(null);

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Child Checkout
            </h1>

            <PickupSearch
                onFound={setCheckIn}
            />

            {checkIn && (

                <CheckoutCard
                    checkIn={checkIn}
                    onUpdated={setCheckIn}
                />

            )}

        </div>

    );

}