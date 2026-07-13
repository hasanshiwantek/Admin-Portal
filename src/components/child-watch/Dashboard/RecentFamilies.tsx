interface Props {
    families: any[];
}

export default function RecentFamilies({
    families = [],
}: Props) {
    return (
        <div className="bg-white rounded-lg shadow">

            <div className="p-4 border-b font-semibold">
                Recent Check-ins
            </div>

            <table className="w-full">

                <thead>

                    <tr>

                        <th className="p-3 text-left">
                            Pickup
                        </th>

                        <th className="p-3 text-left">
                            Parent
                        </th>

                        <th className="p-3 text-left">
                            Children
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {families.map((family: any) => (

                        <tr key={family.id}>

                            <td className="p-3">
                                {family.pickup_code}
                            </td>

                            <td className="p-3">
                                {family.parent.full_name}
                            </td>

                            <td className="p-3">
                                {family.items.length}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}