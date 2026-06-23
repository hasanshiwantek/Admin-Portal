interface Props {
  stats: {
    total_events: number;
    completed_events: number;
    cancelled_events: number;
  };
}

const EventStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">
          Total Events
        </p>
        <h2 className="text-2xl font-bold">
          {stats.total_events}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">
          Completed Events
        </p>
        <h2 className="text-2xl font-bold text-green-600">
          {stats.completed_events}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">
          Cancelled Events
        </p>
        <h2 className="text-2xl font-bold text-red-600">
          {stats.cancelled_events}
        </h2>
      </div>
    </div>
  );
};

export default EventStats;