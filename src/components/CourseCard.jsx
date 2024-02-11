import React from "react";
import { BsAwardFill } from "react-icons/bs";
import { BASE_URL, themeColor } from "../utils/constant";
import { MdDelete } from "react-icons/md";
import { useApiHandler } from "../utils/useApiHandler";
import { useCourseList } from "../utils/useCourseList";
import toast from "react-hot-toast";
import { useScheduleList } from "../utils/useScheduleList";

function CourseCard({ data }) {
  const apihandler = useApiHandler();
  const getCourseList = useCourseList();
  const getScheduleList = useScheduleList();

  const handleDeleteCourse = async () => {
    const apiData = {
      method: "delete",
      url:
        BASE_URL +
        `api/v1/course/delete/${localStorage.getItem("userType")}/${data?._id}`,
    };

    const response = await apihandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      getCourseList();
      getScheduleList();
    }
  };
  return (
    <div className="border p-3 rounded pointer position-relative shadow-sm">
      <div className="row align-items-center">
        <div className="col-5">
          <div className="overflow-hidden border rounded">
            <img
              src={data?.courseImg}
              alt="img"
              style={{ height: "150px", width: "250px" }}
              className="object-fit-contain courseCardImg"
            />
          </div>
        </div>
        <div className="col-7">
          <div className="mb-4">
            <div className="fw-medium fs-4">{data?.name}</div>
            <div
              style={{ fontSize: "13px", color: themeColor.primary }}
              className="d-flex align-items-center gap-2"
            >
              <BsAwardFill />
              <div>{data?.level}</div>
            </div>
          </div>
          <div style={{ color: "#919191" }}>{data?.description}</div>
        </div>
      </div>
      <div className="position-absolute top-0 end-0 p-2">
        <MdDelete onClick={handleDeleteCourse} color="tomato" size={"20px"} />
      </div>
    </div>
  );
}

export default CourseCard;
