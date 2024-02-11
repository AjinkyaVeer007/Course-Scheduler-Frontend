import { useDispatch } from "react-redux";
import { useApiHandler } from "./useApiHandler";
import { BASE_URL } from "./constant";
import { handleScheduleList } from "../store/scheduleListSlice";

export const useScheduleList = () => {
  const dispatch = useDispatch();
  const apiHandler = useApiHandler();
  return async function () {
    const data = {
      method: "get",
      url:
        BASE_URL +
        `api/v1/schedule/get/${localStorage.getItem(
          "userType"
        )}/${localStorage.getItem("userId")}`,
    };

    const response = await apiHandler(data);

    if (response?.success) {
      dispatch(handleScheduleList(response?.data));
    }
  };
};
