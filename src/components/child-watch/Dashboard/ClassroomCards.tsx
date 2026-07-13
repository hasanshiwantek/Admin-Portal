interface Props {
    classrooms: any[];
}

export default function ClassroomCards({
    classrooms = [],
}: Props) {
    return (
        <div className="grid grid-cols-3 gap-5">

            {classrooms.map((room) => (

                <div
                    key={room.id}
                    className="bg-white rounded-lg shadow p-5"
                >
                    <h2 className="font-semibold text-lg">
                        {room.name}
                    </h2>

                    <p className="text-3xl font-bold mt-4">
                        {room.checked_in_count}
                    </p>

                    {room.capacity && (
                        <p className="text-gray-500 mt-2">
                            Capacity: {room.capacity}
                        </p>
                    )}
                </div>

            ))}

        </div>
    );
}