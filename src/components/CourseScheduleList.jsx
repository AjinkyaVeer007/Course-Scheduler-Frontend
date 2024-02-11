import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useScheduleList } from "../utils/useScheduleList";
import { useSelector } from "react-redux";
import moment from "moment";
import { BASE_URL } from "../utils/constant";
import { useApiHandler } from "../utils/useApiHandler";
import toast from "react-hot-toast";

function CourseScheduleList() {
  const scheduleList = useSelector((state) => state.scheduleData.data);

  const userType = localStorage.getItem("userType");

  const getScheduleList = useScheduleList();
  const apiHandler = useApiHandler();

  const handleDeleteSchedule = async (id) => {
    const apiData = {
      method: "delete",
      url: BASE_URL + `api/v1/schedule/delete/${userType}/${id}`,
    };

    const response = await apiHandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      getScheduleList();
    }
  };

  useEffect(() => {
    getScheduleList();
  }, []);
  return (
    <div>
      <div style={{ fontSize: "20px" }} className="fw-medium mb-4">
        Scheduled Course List
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Sr. no.</th>
            <th>Course Name</th>
            <th>Assign Instructor</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {scheduleList?.length ? (
            scheduleList.map((schedule, i) => (
              <tr key={schedule?._id}>
                <td>{i + 1}</td>
                <td>{schedule?.course?.name}</td>
                <td>{schedule?.assignUser?.name}</td>
                <td>{moment(schedule?.assignDate).format("YYYY-MM-DD")}</td>
                <td>
                  <MdDelete
                    onClick={() => handleDeleteSchedule(schedule?._id)}
                    color="tomato"
                    size={"20px"}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={5} className="text-danger">
                No lecture schedule
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CourseScheduleList;
