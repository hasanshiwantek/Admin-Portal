"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import WellerInfo from "@/app/components/wellers/quick-view/WellerInfo";
import { getWellerById } from "@/redux/slices/wellerSlice"; // your thunk
import { useAppDispatch } from "@/hooks/useReduxHooks";
import Spinner from "@/app/components/loader/Spinner";
import WellerSearch from "@/app/components/wellers/quick-view/WellerSearch";
import { ChevronRight } from "lucide-react";
export default function QuickViewPage() {
  const { id } = useParams(); // dynamic route param
  console.log("Weller id: ", id);

  const dispatch = useAppDispatch();

  const [weller, setWeller] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("Weller:... ",weller);
  
  useEffect(() => {
    const fetchWeller = async () => {
      try {
        const resultAction = await dispatch(getWellerById({ wellerId: id }));
        const data = (resultAction as any).payload;
        setWeller(data?.data);
      } catch (err) {
        console.error("❌ Failed to fetch weller:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchWeller();
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <Spinner />
      </div>
    );
  }

  if (!weller) {
    return (
      <div className="text-center text-gray-500 mt-10">
        ❌ Weller not found.
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="text-lg flex justify-start items-center font-light p-4 text-gray-500">
        Home <ChevronRight className="h-5 w-6" />
        <span className="!font-light !text-[var(--primary-color)]">
          Quick View
        </span>
      </div>

      <div className="flex justify-between gap-10 mt-5">
        <WellerSearch selectedWeller={weller} setSelectedWeller={setWeller} />

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <Spinner />
            </div>
          ) : weller ? (
            <WellerInfo selectedWeller={weller} setSelectedWeller={setWeller} />
          ) : (
            <div className="text-gray-500 text-center mt-10">
              Select a weller to view their details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
