import { useDispatch } from "react-redux";
import { useApiHandler } from "./useApiHandler";
import { BASE_URL } from "./constant";
import { handleInstructorList } from "../store/instructorListSlice";

export const useInstructorList = () => {
  const dispatch = useDispatch();
  const apiHandler = useApiHandler();
  return async function () {
    const data = {
      method: "get",
      url:
        BASE_URL +
        `api/v1/user/get/${localStorage.getItem(
          "userType"
        )}/${localStorage.getItem("userId")}`,
    };

    const response = await apiHandler(data);

    if (response?.success) {
      dispatch(handleInstructorList(response?.data));
    }
  };
};
