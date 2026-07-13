interface Props {
    report: any;
    loading: boolean;
}

export default function ReportTable({
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

        <div className="bg-white rounded-lg shadow overflow-hidden">

            <div className="border-b p-5 font-semibold">

                Classroom Summary

            </div>

            <table className="w-full">

                <thead className="bg-gray-50">

                    <tr>

                        <th className="p-3 text-left">

                            Classroom

                        </th>

                        <th className="p-3 text-left">

                            Checked In

                        </th>

                        <th className="p-3 text-left">

                            Checked Out

                        </th>

                        <th className="p-3 text-left">

                            Inside

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {report?.classrooms?.length ? (

                        report.classrooms.map((room: any) => (

                            <tr
                                key={room.id}
                                className="border-b hover:bg-gray-50"
                            >

                                <td className="p-3">

                                    {room.name}

                                </td>

                                <td className="p-3">

                                    {room.checked_in_count}

                                </td>

                                <td className="p-3">

                                    {room.checked_out_count}

                                </td>

                                <td className="p-3">

                                    {room.inside_count}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={4}
                                className="p-5 text-center text-gray-500"
                            >

                                No records found.

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}