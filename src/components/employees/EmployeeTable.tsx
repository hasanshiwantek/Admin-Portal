"use client";

interface Props {

    employees: any[];

    loading: boolean;

    error: any;

    currentPage: number;

    lastPage: number;

    setPage: any;

    filters: any;

    setFilters: any;

    onAdd: () => void;

    onEdit: (employee: any) => void;

    onDelete: (employee: any) => void;

}

export default function EmployeeTable({

    employees,

    loading,

    error,

    currentPage,

    lastPage,

    setPage,

    filters,

    setFilters,

    onAdd,

    onEdit,

    onDelete,

}: Props) {

    const formatDate = (date: string) => {

        return new Date(date).toLocaleDateString("en-US", {

            month: "short",

            day: "2-digit",

            year: "numeric",

        }).replace(/ /g, "-").replace(",", "");

    };
    return (

        <div className="bg-white rounded-lg shadow">

            {/* Header */}

            <div className="flex justify-between items-center border-b p-5">

                <input

                    type="text"

                    placeholder="Search employees..."

                    value={filters.search}

                    onChange={(e) =>

                        setFilters({

                            ...filters,

                            search: e.target.value,

                        })

                    }

                    className="border rounded-lg px-4 py-2 w-80"

                />

                <button

                    onClick={onAdd}

                    className="bg-[#008696] text-white px-5 py-2 rounded-lg"

                >

                    + Add Employee

                </button>

            </div>

            {/* Table */}

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-3 text-left">

                                Name

                            </th>

                            <th className="p-3 text-left">

                                Role

                            </th>

                            <th className="p-3 text-left">

                                Email

                            </th>

                            <th className="p-3 text-left">

                                Phone

                            </th>

                            <th className="p-3 text-left">

                                Hire Date

                            </th>

                            <th className="p-3 text-left">

                                Status

                            </th>

                            <th className="p-3 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td

                                    colSpan={7}

                                    className="text-center p-10"

                                >

                                    Loading...

                                </td>

                            </tr>

                        ) : employees.length === 0 ? (

                            <tr>

                                <td

                                    colSpan={7}

                                    className="text-center p-10"

                                >

                                    No employees found.

                                </td>

                            </tr>

                        ) : (

                            employees.map(

                                (employee: any) => (

                                    <tr

                                        key={employee.id}

                                        className="border-b hover:bg-gray-50"

                                    >

                                        <td className="p-3">

                                            {employee.full_name}

                                        </td>

                                        <td className="p-3">

                                            {employee.role_name}

                                        </td>

                                        <td className="p-3">

                                            {employee.email || "-"}

                                        </td>

                                        <td className="p-3">

                                            {employee.phone || "-"}

                                        </td>

                                        <td className="p-3">

                                            {formatDate(employee.hire_date)}

                                        </td>

                                        <td className="p-3">

                                            {employee.is_active ? (

                                                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm">

                                                    Active

                                                </span>

                                            ) : (

                                                <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-sm">

                                                    Inactive

                                                </span>

                                            )}

                                        </td>

                                        <td className="p-3">

                                            <div className="flex justify-center gap-2">

                                                <button

                                                    onClick={() =>

                                                        onEdit(employee)

                                                    }

                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"

                                                >

                                                    Edit

                                                </button>

                                                <button

                                                    onClick={() =>

                                                        onDelete(employee)

                                                    }

                                                    className="bg-red-600 text-white px-3 py-1 rounded"

                                                >

                                                    Delete

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )

                            )

                        )}

                    </tbody>

                </table>

            </div>

            {/* Pagination */}

            <div className="flex justify-between items-center p-5 border-t">

                <button

                    disabled={currentPage === 1}

                    onClick={() =>

                        setPage(currentPage - 1)

                    }

                    className="border px-4 py-2 rounded"

                >

                    Previous

                </button>

                <span>

                    Page {currentPage} of {lastPage}

                </span>

                <button

                    disabled={currentPage === lastPage}

                    onClick={() =>

                        setPage(currentPage + 1)

                    }

                    className="border px-4 py-2 rounded"

                >

                    Next

                </button>

            </div>

        </div>

    );

}