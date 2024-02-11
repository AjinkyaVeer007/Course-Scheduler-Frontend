import { configureStore } from "@reduxjs/toolkit";
import instructorListSlice from "./instructorListSlice";

const store = configureStore({
  reducer: {
    instructordata: instructorListSlice,
  },
});

export default store;
