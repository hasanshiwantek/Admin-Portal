"use client";

import { useEffect, useState } from "react";
import RegistrationStats from "./RegistrationStats";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { getEventRegistrations, getRegistrationStats } from "@/redux/slices/eventSlice";
import RegistrationEditModal from "./RegistrationEditModal";
import { updateRegistration } from "@/redux/slices/eventSlice";
import WalkInModal from "./WalkInModal";
import { addWalkInRegistration } from "@/redux/slices/eventSlice";
import RegistrationTable from "./RegistrationTable";
import DeleteConfirmationModal from "@/components/common/DeleteConfirmationModal";
import { deleteRegistration } from "@/redux/slices/eventSlice";
import {
  checkInRegistration,
} from "@/redux/slices/eventSlice";
import { bulkCheckInRegistrations } from "@/redux/slices/eventSlice";
import { undoCheckInRegistration } from "@/redux/slices/eventSlice";
import { bulkUndoCheckInRegistrations } from "@/redux/slices/eventSlice";
import { toast } from "react-toastify";

const EventRegistrations = ({
  eventId,
}: {
  eventId: string;
}) => {
  const dispatch = useAppDispatch();

  const {
    registrations,
    selectedEvent,
    registrationStats,
    registrationCurrentPage,
    registrationLastPage,
    loading,
    error,
  } = useAppSelector(
    (state: any) => state.events
  );

  const [filters, setFilters] =
    useState({
        search: "",
        checked_in: "",
    });

  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const [editingRegistration, setEditingRegistration] =
  useState<any>(null);

    const [editModalOpen, setEditModalOpen] =
    useState(false);

    const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

    const [registrationToDelete, setRegistrationToDelete] =
    useState<any>(null);

    const handleEdit = (registration: any) => {
    setEditingRegistration(registration);
    setEditModalOpen(true);
    };

    const [walkInOpen, setWalkInOpen] =
  useState(false);

    const handlePrint = () => {
    window.open(`/print/events/${eventId}`, "_blank");
    };

    const handleSaveRegistration = async (
    data: any
    ) => {
    try {
        await dispatch(
        updateRegistration({
            registrationId:
            editingRegistration.id,
            data,
        })
        ).unwrap();

        setEditModalOpen(false);

        dispatch(
        getEventRegistrations({
            eventId,
            page,
            search: filters.search,
            checked_in: filters.checked_in,
        })
        );

        dispatch(
        getRegistrationStats(eventId)
        );

        toast.success("Registration updated successfully.");

    } catch (err: any) {
        toast.error(err);
    }
    };

    const handleDelete = (registration: any) => {
    setRegistrationToDelete(registration);
    setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
    if (!registrationToDelete) return;

    try {

        await dispatch(
        deleteRegistration(
            registrationToDelete.id
        )
        ).unwrap();

        setDeleteModalOpen(false);

        setRegistrationToDelete(null);

        dispatch(
        getEventRegistrations({
            eventId,
            page,
            search: filters.search,
            checked_in: filters.checked_in,
        })
        );

        dispatch(
        getRegistrationStats(eventId)
        );

        toast.success("Registration deleted successfully.");

    } catch (err: any) {

        toast.error(err);

    }
    };

    const handleCheckIn = async (
    registration: any
    ) => {
    try {
        if (registration.checked_in) {
        await dispatch(
            undoCheckInRegistration(
            registration.id
            )
        ).unwrap();
        } else {
        await dispatch(
            checkInRegistration(
            registration.id
            )
        ).unwrap();
        }

        dispatch(
        getEventRegistrations({
            eventId,
            page,
            search: filters.search,
            checked_in: filters.checked_in,
        })
        );

        dispatch(
        getRegistrationStats(eventId)
        );

    } catch (err: any) {
        toast.error(err);
    }
    };

    const handleBulkCheckIn = async () => {

    if (!selectedRows.length) return;

    try {

        await dispatch(
        bulkCheckInRegistrations(selectedRows)
        ).unwrap();

        setSelectedRows([]);

        dispatch(
        getEventRegistrations({
            eventId,
            page,
            search: filters.search,
            checked_in: filters.checked_in,
        })
        );

        dispatch(
        getRegistrationStats(eventId)
        );

        toast.success("Selected registrations checked in.");

    } catch (err: any) {
        toast.error(err);
    }

    };

    const handleBulkUndoCheckIn =
    async () => {

        try {

            await dispatch(
                bulkUndoCheckInRegistrations(
                    selectedRows
                )
            ).unwrap();

            setSelectedRows([]);

            dispatch(
                getEventRegistrations({
                    eventId,
                    page,
                    search: filters.search,
                    checked_in:
                        filters.checked_in,
                })
            );

            dispatch(
                getRegistrationStats(eventId)
            );

        } catch (err: any) {

            toast.error(err);

        }

    };

    const handleAddWalkIn = () => {
        setWalkInOpen(true);
    };

    const handleSaveWalkIn = async (
        data: any
    ) => {

        if (!data.first_name?.trim()) {
            toast.error("First name is required.");
            return;
        }

        if (!data.email?.trim()) {
            toast.error("Email is required.");
            return;
        }

        try {

            await dispatch(

                addWalkInRegistration({

                    eventId: Number(eventId),

                    data,

                })

            ).unwrap();

            setWalkInOpen(false);

            dispatch(

                getEventRegistrations({

                    eventId,

                    page,

                    search: filters.search,

                    checked_in: filters.checked_in,

                })

            );

            dispatch(
                getRegistrationStats(eventId)
            );

            toast.success("Walk-in added successfully.");

        } catch (err: any) {

            if (err?.errors) {

                Object.values(err.errors)
                    .flat()
                    .forEach((message: any) =>
                        toast.error(message)
                    );

                return;
            }

            toast.error(
                err?.message ||
                err ||
                "Failed to add walk-in."
            );

        }

    };

//   useEffect(() => {
//     dispatch(
//       getEventRegistrations({
//         eventId,
//         page,
//         ...filters,
//       })
//     );
//   }, [dispatch, page, filters, eventId]);

  useEffect(() => {
    if (!eventId) return;

    dispatch(
        getEventRegistrations({
        eventId,
        page,
        search: filters.search,
        checked_in:
            filters.checked_in,
        })
    );

    dispatch(
        getRegistrationStats(eventId)
    );
    }, [
    dispatch,
    eventId,
    page,
    filters,
    ]);

  return (
    <div>
        <div className="mb-3 mt-17">
        <h1 className="text-2xl font-bold">
            Event: {selectedEvent?.title}
        </h1>

        <p className="text-gray-500">
            Start Date: {selectedEvent?.event_start &&
            new Date(
                selectedEvent.event_start
            ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            })}
        </p>
        </div>
        <div className="mt-5">
        <RegistrationStats
            stats={registrationStats}
        />
        </div>

        <RegistrationTable
        registrations={registrations}
        loading={loading}
        error={error}
        currentPage={
            registrationCurrentPage
        }
        lastPage={
            registrationLastPage
        }
        setPage={setPage}
        filters={filters}
        setFilters={setFilters}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}

        onEdit={handleEdit}
        onDelete={handleDelete}
        onCheckIn={handleCheckIn}
        onBulkCheckIn={handleBulkCheckIn}
        onAddWalkIn={handleAddWalkIn}
        onBulkUndoCheckIn={handleBulkUndoCheckIn}
        onPrint={handlePrint}
        />

        <RegistrationEditModal
        open={editModalOpen}
        registration={editingRegistration}
        loading={loading}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveRegistration}
        />

        <WalkInModal
            open={walkInOpen}
            loading={loading}
            onClose={() => setWalkInOpen(false)}
            onSave={handleSaveWalkIn}
        />

        <DeleteConfirmationModal
        open={deleteModalOpen}
        loading={loading}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        />
    </div>
    );
};

export default EventRegistrations;