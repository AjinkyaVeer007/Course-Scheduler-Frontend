import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useScheduleList } from "../utils/useScheduleList";
import moment from "moment";

function CourseScheduleTable() {
  const scheduleList = useSelector((state) => state.scheduleData.data);

  const userType = localStorage.getItem("userType");

  const getScheduleList = useScheduleList();

  useEffect(() => {
    getScheduleList();
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Course Name</th>
          {userType !== "admin" && (
            <>
              <th>Course Description</th>
              <th>Course Image</th>
              <th>Course level</th>
            </>
          )}
          {scheduleList[0]?.assignUser && <th>Assign Instructor</th>}
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {scheduleList?.length ? (
          scheduleList.map((schedule) => (
            <tr key={schedule?._id}>
              <td>{schedule?.course?.name}</td>
              {userType !== "admin" && (
                <>
                  <td>{schedule?.course?.description}</td>
                  <td>
                    <img
                      style={{
                        width: "80px",
                        height: "50px",
                        objectFit: "contain",
                      }}
                      src={schedule?.course?.courseImg}
                      alt="img"
                    />
                  </td>
                  <td>{schedule?.course?.level}</td>
                </>
              )}
              {schedule?.assignUser && <td>{schedule?.assignUser?.name}</td>}
              <td>{moment(schedule?.assignDate).format("YYYY-MM-DD")}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={userType === "admin" ? 3 : 3}
              className="text-danger text-center"
            >
              No lectures Scheduled
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default CourseScheduleTable;
