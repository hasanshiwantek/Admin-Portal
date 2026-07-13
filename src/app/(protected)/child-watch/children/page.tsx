"use client";

import { useEffect, useState } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/useReduxHooks";

import {
    getChildren,
    deleteChild,
} from "@/redux/slices/childWatchSlice";

import ChildTable from "@/components/child-watch/Children/ChildTable";
import ChildModal from "@/components/child-watch/Children/ChildModal";

import { toast } from "react-toastify";

export default function ChildrenPage() {

    const dispatch = useAppDispatch();

    const {
        children,
        loading,
        error,
        childCurrentPage,
        childLastPage,
    } = useAppSelector(
        (state: any) => state.childWatch
    );

    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({
        search: "",
    });

    const [open, setOpen] = useState(false);

    const [selectedChild, setSelectedChild] =
        useState<any>(null);

    useEffect(() => {

        dispatch(

            getChildren({

                page,

                search: filters.search,

            })

        );

    }, [
        dispatch,
        page,
        filters,
    ]);

    const handleDelete = async (
        child: any
    ) => {

        if (
            !confirm(
                "Delete this child?"
            )
        ) return;

        try {

            await dispatch(

                deleteChild(
                    child.id
                )

            ).unwrap();

            toast.success(
                "Child deleted successfully."
            );

            dispatch(

                getChildren({

                    page,

                    search:
                        filters.search,

                })

            );

        } catch (err: any) {

            toast.error(err);

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-5">

                Children

            </h1>

            <ChildTable

                childList={children}

                loading={loading}

                error={error}

                currentPage={
                    childCurrentPage
                }

                lastPage={
                    childLastPage
                }

                setPage={setPage}

                filters={filters}

                setFilters={setFilters}

                onAdd={() => {

                    setSelectedChild(null);

                    setOpen(true);

                }}

                onEdit={(child: any) => {

                    setSelectedChild(child);

                    setOpen(true);

                }}

                onDelete={handleDelete}

            />

            <ChildModal

                open={open}

                onClose={() =>
                    setOpen(false)
                }

                child={selectedChild}

            />

        </div>

    );

}