"use client";

import { useEffect, useState } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/useReduxHooks";

import {
    getEmployees,
    deleteEmployee,
} from "@/redux/slices/employeeSlice";

import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeModal from "@/components/employees/EmployeeModal";

import { toast } from "react-toastify";

export default function EmployeesPage() {

    const dispatch = useAppDispatch();

    const {
        employees,
        loading,
        error,
        currentPage,
        lastPage,
    } = useAppSelector(
        (state: any) => state.employee
    );

    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({

        search: "",

    });

    const [open, setOpen] = useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState<any>(null);

    useEffect(() => {

        dispatch(

            getEmployees({

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
        employee: any
    ) => {

        if (
            !confirm(
                "Delete this employee?"
            )
        ) return;

        try {

            await dispatch(

                deleteEmployee(
                    employee.id
                )

            ).unwrap();

            toast.success(
                "Employee deleted successfully."
            );

            dispatch(

                getEmployees({

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

        <div className="mt-10">

            <h1 className="text-3xl font-bold mb-5">

                Employee Management

            </h1>

            <EmployeeTable

                employees={employees}

                loading={loading}

                error={error}

                currentPage={currentPage}

                lastPage={lastPage}

                setPage={setPage}

                filters={filters}

                setFilters={setFilters}

                onAdd={() => {

                    setSelectedEmployee(null);

                    setOpen(true);

                }}

                onEdit={(employee: any) => {

                    setSelectedEmployee(employee);

                    setOpen(true);

                }}

                onDelete={handleDelete}

            />

            <EmployeeModal

                open={open}

                onClose={() => setOpen(false)}

                employee={selectedEmployee}

            />

        </div>

    );

}