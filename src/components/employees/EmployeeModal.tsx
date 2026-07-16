"use client";

import { useEffect, useState } from "react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/hooks/useReduxHooks";

import {
    getEmployeeRoles,
    storeEmployee,
    updateEmployee,
    getEmployees,
} from "@/redux/slices/employeeSlice";

import { toast } from "react-toastify";

interface Props {

    open: boolean;

    onClose: () => void;

    employee: any;

}

export default function EmployeeModal({

    open,

    onClose,

    employee,

}: Props) {

    const dispatch = useAppDispatch();

    const { employeeRoles } = useAppSelector(
        (state: any) => state.employee
    );

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        employee_role_id: "",

        first_name: "",

        last_name: "",

        email: "",

        phone: "",

        hire_date: "",

        notes: "",

        is_active: true,

    });

    useEffect(() => {

        dispatch(
            getEmployeeRoles()
        );

    }, []);

    useEffect(() => {

        if (employee) {

            setForm({

                employee_role_id:
                    employee.employee_role_id,

                first_name:
                    employee.first_name,

                last_name:
                    employee.last_name || "",

                email:
                    employee.email || "",

                phone:
                    employee.phone || "",

                hire_date:
                    employee.hire_date,

                notes:
                    employee.notes || "",

                is_active:
                    employee.is_active,

            });

        } else {

            setForm({

                employee_role_id: "",

                first_name: "",

                last_name: "",

                email: "",

                phone: "",

                hire_date: "",

                notes: "",

                is_active: true,

            });

        }

    }, [employee]);

    const handleSubmit = async () => {

        setLoading(true);

        try {

            if (employee) {

                await dispatch(

                    updateEmployee({

                        id: employee.id,

                        ...form,

                    })

                ).unwrap();

                toast.success(
                    "Employee updated successfully."
                );

            } else {

                await dispatch(

                    storeEmployee(form)

                ).unwrap();

                toast.success(
                    "Employee created successfully."
                );

            }

            dispatch(
                getEmployees({
                    page: 1,
                    search: "",
                })
            );

            onClose();

        } catch (err: any) {

            toast.error(err);

        }

        setLoading(false);

    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">

                <div className="border-b p-5">

                    <h2 className="text-2xl font-semibold">

                        {employee
                            ? "Edit Employee"
                            : "Add Employee"}

                    </h2>

                </div>

                <div className="p-6 space-y-5">

                    <div className="grid grid-cols-2 gap-5">

                        <div>

                            <label>

                                First Name

                            </label>

                            <input

                                className="border rounded w-full p-2"

                                value={form.first_name}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        first_name:e.target.value,

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Last Name

                            </label>

                            <input

                                className="border rounded w-full p-2"

                                value={form.last_name}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        last_name:e.target.value,

                                    })

                                }

                            />

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <div>

                            <label>

                                Email

                            </label>

                            <input

                                type="email"

                                className="border rounded w-full p-2"

                                value={form.email}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        email:e.target.value,

                                    })

                                }

                            />

                        </div>

                        <div>

                            <label>

                                Phone

                            </label>

                            <input

                                className="border rounded w-full p-2"

                                value={form.phone}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        phone:e.target.value,

                                    })

                                }

                            />

                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <div>

                            <label>

                                Role

                            </label>

                            <select

                                className="border rounded w-full p-2"

                                value={form.employee_role_id}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        employee_role_id:e.target.value,

                                    })

                                }

                            >

                                <option value="">

                                    Select Role

                                </option>

                                {

                                    employeeRoles.map(

                                        (role:any)=>(

                                            <option

                                                key={role.id}

                                                value={role.id}

                                            >

                                                {role.name}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                        <div>

                            <label>

                                Hire Date

                            </label>

                            <input

                                type="date"

                                className="border rounded w-full p-2"

                                value={form.hire_date}

                                onChange={(e)=>

                                    setForm({

                                        ...form,

                                        hire_date:e.target.value,

                                    })

                                }

                            />

                        </div>

                    </div>

                    <div>

                        <label>

                            Notes

                        </label>

                        <textarea

                            rows={4}

                            className="border rounded w-full p-2"

                            value={form.notes}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    notes:e.target.value,

                                })

                            }

                        />

                    </div>

                    <div className="flex items-center gap-3">

                        <input

                            type="checkbox"

                            checked={form.is_active}

                            onChange={(e)=>

                                setForm({

                                    ...form,

                                    is_active:e.target.checked,

                                })

                            }

                        />

                        <span>

                            Active Employee

                        </span>

                    </div>

                </div>

                <div className="border-t p-5 flex justify-end gap-3">

                    <button

                        onClick={onClose}

                        className="border px-5 py-2 rounded"

                    >

                        Cancel

                    </button>

                    <button

                        disabled={loading}

                        onClick={handleSubmit}

                        className="bg-[#008696] text-white px-6 py-2 rounded"

                    >

                        {

                            employee

                                ? "Update Employee"

                                : "Create Employee"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}