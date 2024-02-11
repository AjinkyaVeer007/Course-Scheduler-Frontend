import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const instructorListSlice = createSlice({
  name: "instructor List",
  initialState,
  reducers: {
    handleInstructorList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { handleInstructorList } = instructorListSlice.actions;
export default instructorListSlice.reducer;
