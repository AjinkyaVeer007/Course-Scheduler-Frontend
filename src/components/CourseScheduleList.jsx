import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useScheduleList } from "../utils/useScheduleList";
import { useSelector } from "react-redux";

function CourseScheduleList() {
  const scheduleList = useSelector((state) => state.scheduleData.data);

  const getScheduleList = useScheduleList();

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
          {scheduleList?.length
            ? scheduleList.map((schedule, i) => (
                <tr key={schedule?._id}>
                  <td>{i + 1}</td>
                  <td>{schedule?.course?.name}</td>
                  <td>{schedule?.assignUser?.name}</td>
                  <td>{schedule?.assignDate}</td>
                  <td>
                    <MdDelete color="tomato" size={"20px"} />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </Table>
    </div>
  );
}

export default CourseScheduleList;
