interface Props{

    filters:any;

    setFilters:any;

    onSearch:any;

}

export default function DateRangeFilter({

    filters,

    setFilters,

    onSearch,

}:Props){

    return(

        <div className="bg-white rounded-lg shadow p-5">

            <div className="flex gap-4">

                <input

                    type="date"

                    className="border rounded p-3"

                    value={filters.start}

                    onChange={(e)=>

                        setFilters({

                            ...filters,

                            start:e.target.value,

                        })

                    }

                />

                <input

                    type="date"

                    className="border rounded p-3"

                    value={filters.end}

                    onChange={(e)=>

                        setFilters({

                            ...filters,

                            end:e.target.value,

                        })

                    }

                />

                <button

                    onClick={onSearch}

                    className="bg-[#008696] text-white px-6 rounded"

                >

                    Search

                </button>

            </div>

        </div>

    );

}