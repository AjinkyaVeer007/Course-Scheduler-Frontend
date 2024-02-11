import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useScheduleList } from "../utils/useScheduleList";

function CourseScheduleTable() {
  const scheduleList = useSelector((state) => state.scheduleData.data);

  const getScheduleList = useScheduleList();

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Assign Instructor</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scheduleList?.length
          ? scheduleList.map((schedule) => (
              <tr key={schedule?._id}>
                <td>{schedule?.course?.name}</td>
                <td>{schedule?.assignUser?.name}</td>
                <td>{schedule?.assignDate}</td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}

export default CourseScheduleTable;
