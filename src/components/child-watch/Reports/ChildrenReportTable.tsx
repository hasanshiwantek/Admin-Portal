interface Props {

    report: any;

    loading: boolean;

}

export default function ChildrenReportTable({

    report,

    loading,

}: Props) {

    if (loading) {

        return (

            <div className="bg-white rounded-lg shadow p-10">

                Loading...

            </div>

        );

    }

    return (

        <div className="bg-white rounded-lg shadow">

            <div className="border-b p-5 font-semibold">

                Children Report

            </div>

            <table className="w-full">

                <thead>

                    <tr>

                        <th className="p-3 text-left">

                            Pickup #

                        </th>

                        <th className="p-3 text-left">

                            Child

                        </th>

                        <th className="p-3 text-left">

                            Parent

                        </th>

                        <th className="p-3 text-left">

                            Classroom

                        </th>

                        <th className="p-3 text-left">

                            Check In

                        </th>

                        <th className="p-3 text-left">

                            Status

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        report?.children_list?.map(

                            (item: any) => (

                                <tr
                                    key={item.id}
                                    className="border-b"
                                >

                                    <td className="p-3">

                                        {item.pickup_number}

                                    </td>

                                    <td className="p-3">

                                        {item.child.full_name}

                                    </td>

                                    <td className="p-3">

                                        {item.check_in.parent.full_name}

                                    </td>

                                    <td className="p-3">

                                        {item.classroom.name}

                                    </td>

                                    <td className="p-3">

                                        {

                                            new Date(

                                                item.check_in.checked_in_at

                                            ).toLocaleTimeString([], {

                                                hour: "2-digit",

                                                minute: "2-digit",

                                            })

                                        }

                                    </td>

                                    <td className="p-3">

                                        {

                                            item.checked_out

                                                ? (

                                                    <span className="text-red-600 font-medium">

                                                        Checked Out

                                                    </span>

                                                )

                                                : (

                                                    <span className="text-green-600 font-medium">

                                                        Inside

                                                    </span>

                                                )

                                        }

                                    </td>

                                </tr>

                            )

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}