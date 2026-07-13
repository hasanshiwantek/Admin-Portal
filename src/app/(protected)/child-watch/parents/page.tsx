"use client";

import { useEffect, useState } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/useReduxHooks";

import {
    getParents, deleteParent,
} from "@/redux/slices/childWatchSlice";

import ParentTable
from "@/components/child-watch/Parents/ParentTable";

import ParentModal
from "@/components/child-watch/Parents/ParentModal";
import { toast } from "react-toastify";

export default function ParentsPage(){

    const dispatch =
        useAppDispatch();

    const{

        parents,

        loading,

        error,

        parentCurrentPage,

        parentLastPage,

    }=useAppSelector(
        (state:any)=>
            state.childWatch
    );

    const[page,setPage]=
        useState(1);

    const[filters,setFilters]=
        useState({

            search:"",

        });

    const[open,setOpen]=
        useState(false);

    const[selectedParent,
        setSelectedParent]=
        useState(null);

    const handleDelete = async (parent:any)=>{

        if(!confirm(
            "Delete this parent?"
        )) return;

        try{

            await dispatch(

                deleteParent(parent.id)

            ).unwrap();

            toast.success(
                "Parent deleted successfully."
            );

            dispatch(

                getParents({

                    page,

                    search:filters.search,

                })

            );

        }catch(err:any){

            toast.error(err);

        }

    };    

    useEffect(()=>{

        dispatch(

            getParents({

                page,

                search:
                    filters.search,

            })

        );

    },[
        dispatch,
        page,
        filters,
    ]);

    return(

        <div>

            <h1
            className="text-3xl font-bold mb-5">

                Parents

            </h1>

            <ParentTable

                parents={parents}

                loading={loading}

                error={error}

                currentPage={
                    parentCurrentPage
                }

                lastPage={
                    parentLastPage
                }

                setPage={setPage}

                filters={filters}

                setFilters={setFilters}

                onAdd={()=>{

                    setSelectedParent(null);

                    setOpen(true);

                }}

                onEdit={(parent:any)=>{

                    setSelectedParent(
                        parent
                    );

                    setOpen(true);

                }}

                onDelete={handleDelete}

            />

            <ParentModal

                open={open}

                onClose={()=>
                    setOpen(false)
                }

                parent={selectedParent}

            />

        </div>

    );

}