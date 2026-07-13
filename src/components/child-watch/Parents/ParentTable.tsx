interface Props{

    parents:any[];

    loading:boolean;

    error:any;

    currentPage:number;

    lastPage:number;

    setPage:any;

    filters:any;

    setFilters:any;

    onAdd:any;

    onEdit:any;

    onDelete:any;

}

export default function ParentTable({

    parents,

    loading,

    error,

    currentPage,

    lastPage,

    setPage,

    filters,

    setFilters,

    onAdd,

    onEdit,

    onDelete,

}:Props){

    if(loading){

        return(
            <div className="p-5">
                Loading...
            </div>
        );

    }

    return(

        <div className="bg-white rounded-lg shadow">

            <div className="flex justify-between p-5 border-b">

                <input

                    className="border rounded px-3 py-2 w-80"

                    placeholder="Search..."

                    value={filters.search}

                    onChange={(e)=>{

                        setPage(1);

                        setFilters({

                            ...filters,

                            search:e.target.value,

                        });

                    }}

                />

                <button

                    onClick={onAdd}

                    className="bg-[#008696] text-white px-5 py-2 rounded"

                >

                    + Add Parent

                </button>

            </div>

            <table className="w-full">

                <thead>

                    <tr>

                        <th className="p-3 text-left">
                            Name
                        </th>

                        <th className="p-3 text-left">
                            Phone
                        </th>

                        <th className="p-3 text-left">
                            Email
                        </th>

                        <th className="p-3 text-left">
                            Children
                        </th>

                        <th className="p-3 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {parents.map((parent:any)=>(

                        <tr key={parent.id}>

                            <td className="p-3">

                                {parent.full_name}

                            </td>

                            <td className="p-3">

                                {parent.phone}

                            </td>

                            <td className="p-3">

                                {parent.email}

                            </td>

                            <td className="p-3">

                                {parent.children_count}

                            </td>

                            <td className="p-3">

                                <div className="flex gap-3 justify-start">

                                    <button

                                        onClick={() => onEdit(parent)}

                                        className="text-blue-600 hover:underline"

                                    >

                                        Edit

                                    </button>

                                    <button

                                        onClick={() => onDelete(parent)}

                                        className="text-red-600 hover:underline"

                                    >

                                        Delete

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}