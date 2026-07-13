"use client";

interface Props {

    children: any[];

    loading: boolean;

    error: any;

    currentPage: number;

    lastPage: number;

    setPage: any;

    filters: any;

    setFilters: any;

    onAdd: any;

    onEdit: any;

    onDelete: any;

}

export default function ChildTable({

    children,

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

    if (loading) {

        return (

            <div className="p-5">

                Loading...

            </div>

        );

    }

    return (

        <div className="bg-white rounded-lg shadow">

            <div className="flex justify-between items-center p-5 border-b">

                <input

                    className="border rounded px-3 py-2 w-80"

                    placeholder="Search child, parent..."

                    value={filters.search}

                    onChange={(e) => {

                        setPage(1);

                        setFilters({

                            ...filters,

                            search: e.target.value,

                        });

                    }}

                />

                <button

                    onClick={onAdd}

                    className="bg-[#008696] text-white px-5 py-2 rounded"

                >

                    + Add Child

                </button>

            </div>

            {error && (

                <div className="p-5 text-red-600">

                    {error}

                </div>

            )}

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="p-3 text-left">

                            Child

                        </th>

                        <th className="p-3 text-left">

                            Parent

                        </th>

                        <th className="p-3 text-left">

                            Classroom

                        </th>

                        <th className="p-3 text-center">

                            Age

                        </th>

                        <th className="p-3 text-center">

                            Status

                        </th>

                        <th className="p-3 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {children.length > 0 ? (

                        children.map((child: any) => (

                            <tr

                                key={child.id}

                                className="border-b hover:bg-gray-50"

                            >

                                <td className="p-3">

                                    {child.full_name}

                                </td>

                                <td className="p-3">

                                    {child.parent?.full_name}

                                </td>

                                <td className="p-3">

                                    {child.classroom?.name ?? "-"}

                                </td>

                                <td className="p-3 text-center">

                                    {child.age}

                                </td>

                                <td className="p-3 text-center">

                                    {child.is_active ? (

                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">

                                            Active

                                        </span>

                                    ) : (

                                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">

                                            Inactive

                                        </span>

                                    )}

                                </td>

                                <td className="p-3">

                                    <div className="flex justify-center gap-3">

                                        <button

                                            onClick={() => onEdit(child)}

                                            className="text-blue-600 hover:underline"

                                        >

                                            Edit

                                        </button>

                                        <button

                                            onClick={() => onDelete(child)}

                                            className="text-red-600 hover:underline"

                                        >

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td

                                colSpan={6}

                                className="text-center py-8"

                            >

                                No children found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

            <div className="flex justify-end items-center gap-3 p-5 border-t">

                <button

                    disabled={currentPage === 1}

                    onClick={() => setPage(currentPage - 1)}

                    className="border px-4 py-2 rounded disabled:opacity-50"

                >

                    Previous

                </button>

                <span>

                    Page {currentPage} of {lastPage}

                </span>

                <button

                    disabled={currentPage === lastPage}

                    onClick={() => setPage(currentPage + 1)}

                    className="border px-4 py-2 rounded disabled:opacity-50"

                >

                    Next

                </button>

            </div>

        </div>

    );

}