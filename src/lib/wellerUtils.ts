import { AppDispatch } from "@/redux/store";
import { getAllWellers } from "@/redux/slices/wellerSlice";
export const refetchWellers = async (
  dispatch: AppDispatch,
  page = 1,
  perPage = 50
) => {
  try {
    await dispatch(getAllWellers()).unwrap();
    console.log("✅ Refetched Wellers.");
  } catch (err) {
    console.error("❌ Error re-fetching wellers:", err);
  }
};
