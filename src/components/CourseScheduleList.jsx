import React from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";

function CourseScheduleList() {
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
          <tr>
            <td>1</td>
            <td>Python</td>
            <td>Rushikesh</td>
            <td>1-July-2024</td>
            <td>
              <MdDelete color="tomato" size={"20px"} />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default CourseScheduleList;
