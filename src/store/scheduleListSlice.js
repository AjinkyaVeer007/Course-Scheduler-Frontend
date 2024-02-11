import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const scheduleListSlice = createSlice({
  name: "schedule List",
  initialState,
  reducers: {
    handleScheduleList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { handleScheduleList } = scheduleListSlice.actions;
export default scheduleListSlice.reducer;
