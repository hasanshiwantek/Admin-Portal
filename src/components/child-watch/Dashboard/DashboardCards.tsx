interface Props {
    stats: any;
}

export default function DashboardCards({
    stats,
}: Props) {
    const cards = [
        {
            title: "Families",
            value: stats?.families_checked_in ?? 0,
        },
        {
            title: "Children",
            value: stats?.children_checked_in ?? 0,
        },
        {
            title: "Checked Out",
            value: stats?.children_checked_out ?? 0,
        },
        {
            title: "Currently Inside",
            value: stats?.currently_inside ?? 0,
        },
    ];

    return (
        <div className="grid grid-cols-4 gap-5">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className="bg-white rounded-lg shadow p-5"
                >
                    <p className="text-gray-500">
                        {card.title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {card.value}
                    </h2>
                </div>

            ))}

        </div>
    );
}