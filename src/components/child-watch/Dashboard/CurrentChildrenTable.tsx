interface Props {
    currentChildren: any[];
}

export default function CurrentChildrenTable({
    currentChildren = [],
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow">

            <div className="p-4 border-b font-semibold">
                Currently Inside
            </div>

            <table className="w-full">

                <thead>

                    <tr>

                        <th className="p-3 text-left">
                            Child
                        </th>

                        <th className="p-3 text-left">
                            Parent
                        </th>

                        <th className="p-3 text-left">
                            Classroom
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {currentChildren.map((item: any) => (

                        <tr key={item.id}>

                            <td className="p-3">
                                {item.child.full_name ?? "-"}
                            </td>

                            <td className="p-3">
                                {item.check_in.parent.full_name  ?? "-"}
                            </td>

                            <td className="p-3">
                                {item.classroom.name  ?? "-"}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}