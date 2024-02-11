import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useInstructorList } from "../utils/useInstructorList";
import { useSelector } from "react-redux";

function InstructorList() {
  const instructorList = useSelector((state) => state.instructordata.data);

  const getInstructor = useInstructorList();

  useEffect(() => {
    getInstructor();
  }, []);
  return (
    <div>
      <div style={{ fontSize: "20px" }} className="fw-medium mb-4">
        Instructor List
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Sr. no.</th>
            <th>Name</th>
            <th>Email</th>
            <th>One time password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instructorList?.length ? (
            instructorList.map((user, i) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.oneTimePassword}</td>
                <td>
                  <MdDelete color="tomato" size={"20px"} />
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default InstructorList;
