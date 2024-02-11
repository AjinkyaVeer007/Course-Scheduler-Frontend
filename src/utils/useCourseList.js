import { useDispatch } from "react-redux";
import { useApiHandler } from "./useApiHandler";
import { BASE_URL } from "./constant";
import { handleCourseList } from "../store/courseListSlice";

export const useCourseList = () => {
  const dispatch = useDispatch();
  const apiHandler = useApiHandler();
  return async function () {
    const data = {
      method: "get",
      url:
        BASE_URL +
        `api/v1/course/get/${localStorage.getItem(
          "userType"
        )}/${localStorage.getItem("userId")}`,
    };

    const response = await apiHandler(data);

    if (response?.success) {
      dispatch(handleCourseList(response?.data));
    }
  };
};
