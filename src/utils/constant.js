export const BASE_URL = "https://lecture-schedule.onrender.com/";

export const themeColor = {
  primary: "#FF6868",
  accent: "#F9EFDB",
};

export const navTabs = [
  {
    id: 1,
    name: "Dashboard",
    navigate: "/main/dashboard",
  },
  {
    id: 2,
    name: "Upload Course",
    navigate: "/main/course/new",
  },
  {
    id: 3,
    name: "Schedule Lectures",
    navigate: "/main/schedule",
  },
  {
    id: 4,
    name: "Manage Instructors",
    navigate: "/main/instructors",
  },
];

export const activeNavTab = {
  color: themeColor.primary,
};
export const notactiveNavTab = {
  color: "#ababab",
};

export const courseLevel = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Master", value: "Master" },
];

export const regexPatternForEmail = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const regexPatternForPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
