import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useInstructorList } from "../utils/useInstructorList";
import { useSelector } from "react-redux";
import { useApiHandler } from "../utils/useApiHandler";
import { BASE_URL } from "../utils/constant";
import toast from "react-hot-toast";

function InstructorList() {
  const instructorList = useSelector((state) => state.instructordata.data);

  const getInstructor = useInstructorList();
  const apiHandler = useApiHandler();

  const userType = localStorage.getItem("userType");

  const handleDeleteInstructor = async (id) => {
    const apiData = {
      method: "delete",
      url: BASE_URL + `api/v1/user/delete/${userType}/${id}`,
    };

    const response = await apiHandler(apiData);

    if (response?.success) {
      toast.success(response?.message);
      getInstructor();
    }
  };

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
                  <MdDelete
                    onClick={() => handleDeleteInstructor(user?._id)}
                    color="tomato"
                    size={"20px"}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-danger text-center">
                No instructor created
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default InstructorList;
