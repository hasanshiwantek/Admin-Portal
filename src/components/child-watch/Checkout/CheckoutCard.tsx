"use client";

import { useState } from "react";

import { useAppDispatch } from "@/hooks/useReduxHooks";

import {
    checkoutFamily,
    checkoutChild,
} from "@/redux/slices/childWatchSlice";

import { toast } from "react-toastify";

interface Props {

    checkIn:any;

    onUpdated:any;

}

export default function CheckoutCard({

    checkIn,

    onUpdated,

}:Props){

    const dispatch =
        useAppDispatch();

    const [loading,setLoading]=
        useState(false);

    const handleFamilyCheckout=
    async()=>{

        setLoading(true);

        try{

            await dispatch(

                checkoutFamily(
                    checkIn.id
                )

            ).unwrap();

            toast.success(
                "Family checked out."
            );

            onUpdated(null);

        }catch(err:any){

            toast.error(err);

        }

        setLoading(false);

    };

    const handleChildCheckout=
    async(item:any)=>{

        try{

            await dispatch(

                checkoutChild(
                    item.id
                )

            ).unwrap();

            item.checked_out=true;

            onUpdated({
                ...checkIn
            });

            toast.success(
                "Child checked out."
            );

        }catch(err:any){

            toast.error(err);

        }

    };

    return(

        <div className="bg-white rounded-lg shadow">

            <div className="border-b p-5">

                <h2 className="text-2xl font-semibold">

                    Pickup Code #

                    {checkIn.selected_pickup_number}

                </h2>

                <p>

                    Parent:

                    {checkIn.parent.full_name}

                </p>

            </div>

            <div className="p-5 space-y-3">

                {checkIn.items.map(
                    (item:any)=>(

                    <div
                        key={item.id}
                        className="border rounded p-4 flex justify-between items-center"
                    >

                        <div>

                            <h3>

                                {item.child.full_name}

                            </h3>

                            <p>

                                Pickup #

                                {item.pickup_number}

                            </p>

                            <p>

                                {item.classroom.name}

                            </p>

                        </div>

                        {item.checked_out ? (

                            <span className="text-green-600 font-semibold">

                                Checked Out

                            </span>

                        ) : (

                            <button

                                onClick={()=>

                                    handleChildCheckout(item)

                                }

                                className="bg-green-600 text-white px-4 py-2 rounded"

                            >

                                Checkout

                            </button>

                        )}

                    </div>

                ))}

            </div>

            <div className="border-t p-5 flex justify-end">

                <button

                    disabled={loading}

                    onClick={
                        handleFamilyCheckout
                    }

                    className="bg-red-600 text-white px-6 py-3 rounded"

                >

                    Checkout Entire Family

                </button>

            </div>

        </div>

    );

}