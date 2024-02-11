import { configureStore } from "@reduxjs/toolkit";
import instructorListSlice from "./instructorListSlice";
import courseListSlice from "./courseListSlice";
import scheduleListSlice from "./scheduleListSlice";

const store = configureStore({
  reducer: {
    instructordata: instructorListSlice,
    courseData: courseListSlice,
    scheduleData: scheduleListSlice,
  },
});

export default store;
