import React from "react";
import CardImg from "../assets/a.png";
import { BsAwardFill } from "react-icons/bs";
import { themeColor } from "../utils/constant";

function CourseCard() {
  return (
    <div className="border p-3 rounded pointer position-relative shadow-sm">
      <div className="row align-items-center">
        <div className="col-5">
          <div className="overflow-hidden border rounded">
            <img
              src={CardImg}
              alt="img"
              style={{ height: "150px", width: "250px" }}
              className="object-fit-contain courseCardImg"
            />
          </div>
        </div>
        <div className="col-7">
          <div className="mb-4">
            <div className="fw-medium fs-4">Python</div>
            <div
              style={{ fontSize: "13px", color: themeColor.primary }}
              className="d-flex align-items-center gap-2"
            >
              <BsAwardFill />
              <div>Beginer</div>
            </div>
          </div>
          <div style={{ color: "#919191" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id ullam
            cum quo harum quidem suscipit saepe voluptatibus recusandae
            cupiditate obcaecati.
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
