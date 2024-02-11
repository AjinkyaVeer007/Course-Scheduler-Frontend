import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const courseListSlice = createSlice({
  name: "course List",
  initialState,
  reducers: {
    handleCourseList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { handleCourseList } = courseListSlice.actions;
export default courseListSlice.reducer;
