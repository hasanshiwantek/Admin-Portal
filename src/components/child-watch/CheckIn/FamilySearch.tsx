"use client";

import { useState } from "react";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { searchFamilies } from "@/redux/slices/childWatchSlice";

interface Props {
    onSelect: (family: any) => void;
    onCreate: () => void;
}

export default function FamilySearch({
    onSelect,
    onCreate,
}: Props) {

    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");

    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {

        if (!search.trim()) return;

        const res: any = await dispatch(
            searchFamilies(search)
        ).unwrap();

        setResults(res);

    };

    return (

        <div className="bg-white rounded-lg shadow p-5">

            <div className="flex gap-3">

                <input
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    placeholder="Search parent..."
                    className="border rounded w-full p-3"
                />

                <button
                    onClick={handleSearch}
                    className="bg-[#008696] text-white px-5 rounded"
                >
                    Search
                </button>

            </div>

            <div className="mt-5">

                {results.length > 0 ? (

                    results.map((parent) => (

                        <div
                            key={parent.id}
                            className="border rounded p-3 mt-3 cursor-pointer hover:bg-gray-50"
                            onClick={() =>
                                onSelect(parent)
                            }
                        >
                            <h2 className="font-semibold">
                                {parent.full_name}
                            </h2>

                            <p>
                                {parent.phone}
                            </p>

                            <p>
                                {parent.children_count} Children
                            </p>

                        </div>

                    ))

                ) : (

                    <button
                        onClick={onCreate}
                        className="text-[#008696] mt-3"
                    >
                        + Create New Family
                    </button>

                )}

            </div>

        </div>

    );

}