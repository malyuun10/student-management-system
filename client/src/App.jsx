import { useState, useEffect } from "react";

import Sidebar from "./pages/Sidebar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import Studentpage from "./pages/Studentpage.jsx";
import Courses from "./pages/courses.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import Attendance from "./pages/Attendance.jsx";
import Results from "./pages/Results.jsx";
import AddResult from "./pages/AddResult.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
  const [page, setPage] = useState("login");

  // Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Notifications
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("notifications");

    return saved === null ? true : saved === "true";
  });

  // Save Dark Mode and toggle HTML class
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    
    // U kuwait root HTML class-ka "dark" si Tailwind `dark:` uu u shaqeeyo
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Save Notifications
  useEffect(() => {
    localStorage.setItem("notifications", notifications);
  }, [notifications]);

  const renderPage = () => {

    // LOGIN
    if (page === "login") {
      return <Login setPage={setPage} darkMode={darkMode} />;
    }

    // REGISTER
    if (page === "register") {
      return <Register setPage={setPage} darkMode={darkMode} />;
    }

    // DASHBOARD (Explicity Added)
    if (page === "dashboard") {
      return <Dashboard setPage={setPage} darkMode={darkMode} />;
    }

    // STUDENT PROFILE
    if (page.startsWith("profile-")) {
      const studentId = page.replace("profile-", "");

      return (
        <StudentProfile
          setPage={setPage}
          studentId={studentId}
          darkMode={darkMode}
        />
      );
    }

    // ADD STUDENT
    if (page === "addStudent") {
      return <AddStudent setPage={setPage} darkMode={darkMode} />;
    }

    // STUDENTS
    if (page === "students") {
      return <Studentpage setPage={setPage} darkMode={darkMode} />;
    }

    // COURSES
    if (page === "courses") {
      return <Courses setPage={setPage} darkMode={darkMode} />;
    }

    // ADD COURSE
    if (page === "addCourse") {
      return <AddCourse setPage={setPage} darkMode={darkMode} />;
    }

    // ATTENDANCE
    if (page === "attendance") {
      return <Attendance setPage={setPage} darkMode={darkMode} />;
    }

    // RESULTS
    if (page === "results") {
      return <Results setPage={setPage} darkMode={darkMode} />;
    }

    // ADD RESULT
    if (page === "addResult") {
      return <AddResult setPage={setPage} darkMode={darkMode} />;
    }

    // REPORTS
    if (page === "reports") {
      return <Reports setPage={setPage} darkMode={darkMode} />;
    }

    // SETTINGS
    if (page === "settings") {
      return (
        <Settings
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      );
    }

    // Fallback Page
    return <Dashboard setPage={setPage} darkMode={darkMode} />;
  };

  // LOGIN & REGISTER
  if (page === "login" || page === "register") {
    return (
      <div
        className={
          darkMode
            ? "dark min-h-screen bg-slate-950 text-white"
            : "min-h-screen bg-slate-100"
        }
      >
        {renderPage()}
      </div>
    );
  }

  return (
    <div
      className={
        darkMode
          ? "dark min-h-screen flex bg-slate-950 text-white"
          : "min-h-screen flex bg-slate-100"
      }
    >

      {/* SIDEBAR */}
      <Sidebar
        setPage={setPage}
        activePage={
          page.startsWith("profile-")
            ? "students"
            : page
        }
        darkMode={darkMode}
      />

      {/* PAGE CONTENT */}
      <main className="flex-1 min-w-0">
        {renderPage()}
      </main>

    </div>
  );
}

export default App;