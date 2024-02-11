import React from "react";
import { Table } from "react-bootstrap";

function CourseScheduleTable() {
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
        <tr>
          <td>Python</td>
          <td>Rushikesh</td>
          <td>1-July-2024</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default CourseScheduleTable;
