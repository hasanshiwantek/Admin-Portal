interface Props {
  stats: {
    total_events: number;
    completed_events: number | string;
    cancelled_events: number | string;
    draft_events: number | string;
    deleted_events: number | string;
  };
}

const EventStats = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Total Events</p>
        <h2 className="text-2xl font-bold">
          {stats?.total_events ?? 0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Completed Events</p>
        <h2 className="text-2xl font-bold">
          {stats?.completed_events ?? 0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Cancelled Events</p>
        <h2 className="text-2xl font-bold">
          {stats?.cancelled_events ?? 0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Draft Events</p>
        <h2 className="text-2xl font-bold">
          {stats?.draft_events ?? 0}
        </h2>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <p className="text-gray-500">Deleted Events</p>
        <h2 className="text-2xl font-bold">
          {stats?.deleted_events ?? 0}
        </h2>
      </div>
    </div>
  );
};

export default EventStats;